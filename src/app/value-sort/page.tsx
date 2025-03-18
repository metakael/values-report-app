'use client';
// src/app/value-sort/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../contexts/UserContext';
import { VALUES_LIST, ValueItem, shuffleValues, ImportanceLevel } from '../lib/values';

export default function ValueSortPage() {
  const router = useRouter();
  const { addCategorizedValue, user, setVeryImportantValues } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledValues, setShuffledValues] = useState<ValueItem[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({
    very: 0,
    somewhat: 0,
    not: 0
  });

  // Initialize shuffled values on page load
  useEffect(() => {
    setShuffledValues(shuffleValues(VALUES_LIST));
  }, []);

  // Calculate progress
  useEffect(() => {
    if (shuffledValues.length > 0) {
      setProgress(Math.round((currentIndex / shuffledValues.length) * 100));
    }
  }, [currentIndex, shuffledValues.length]);

  // Reset categorizedValues in context when starting
  useEffect(() => {
    // Reset happens in the UserContext
  }, []);

  // Handle value categorization
  const handleCategorize = (importance: ImportanceLevel) => {
    if (currentIndex < shuffledValues.length) {
      const currentValue = shuffledValues[currentIndex];
      
      // Add to categorized values in context
      addCategorizedValue(currentValue, importance);
      
      // Update local count
      setCategoryCounts(prev => ({
        ...prev,
        [importance]: prev[importance] + 1
      }));

      // Move to next value
      if (currentIndex < shuffledValues.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Sorting is complete
        setIsComplete(true);
        
        // Get all values marked as "very important" from user context
        const veryImportantValues = user.categorizedValues.very;
        
        // Store in context for the next step
        setVeryImportantValues(veryImportantValues);
        
        // Navigate to the selection page
        setTimeout(() => {
          router.push('/value-sort/selection');
        }, 1000);
      }
    }
  };

  // Display current value
  const currentValue = currentIndex < shuffledValues.length ? shuffledValues[currentIndex] : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Value Sort</h1>
          <p className="mt-2 text-gray-600">
            For each value, indicate how important it is to you.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{currentIndex} of {shuffledValues.length}</span>
          <span>{progress}% Complete</span>
        </div>

        {/* Category counts */}
        <div className="flex justify-around text-sm">
          <div className="text-center">
            <div className="font-medium text-green-600">Very Important</div>
            <div className="text-2xl font-bold">{categoryCounts.very}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-yellow-600">Somewhat Important</div>
            <div className="text-2xl font-bold">{categoryCounts.somewhat}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-600">Not So Important</div>
            <div className="text-2xl font-bold">{categoryCounts.not}</div>
          </div>
        </div>

        {currentValue && !isComplete ? (
          <div className="p-6 border-2 border-gray-200 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-2">{currentValue.text}</h2>
            <p className="text-gray-600 text-center mb-6">{currentValue.description}</p>
            
            <div className="space-y-4">
              <button
                onClick={() => handleCategorize('very')}
                className="w-full py-3 px-4 bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded-md transition-colors"
              >
                Very Important to Me
              </button>
              <button
                onClick={() => handleCategorize('somewhat')}
                className="w-full py-3 px-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium rounded-md transition-colors"
              >
                Somewhat Important to Me
              </button>
              <button
                onClick={() => handleCategorize('not')}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md transition-colors"
              >
                Not So Important to Me
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            {isComplete ? (
              <div className="space-y-4">
                <div className="text-2xl font-bold text-indigo-600">
                  Sorting Complete!
                </div>
                <p className="text-gray-600">
                  You've categorized all values. Now we'll move on to selecting your top values.
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              </div>
            ) : (
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}