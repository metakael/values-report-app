'use client';
// src/app/value-sort/selection/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/UserContext';
import { ValueItem } from '../../lib/values';

export default function SelectionPage() {
  const router = useRouter();
  const { user, setTopTenValues } = useUser();
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Get very important values from context
  const veryImportantValues = user.veryImportantValues;

  // Check if we need to redirect back to sorting
  useEffect(() => {
    if (veryImportantValues.length === 0) {
      // If no values are marked as very important, redirect to the sorting page
      router.push('/value-sort');
    }
  }, [veryImportantValues.length, router]);

  // Handle value selection
  const toggleValueSelection = (value: ValueItem) => {
    if (selectedValues.some(v => v.id === value.id)) {
      // Remove if already selected
      setSelectedValues(selectedValues.filter(v => v.id !== value.id));
    } else {
      // Add if not selected and less than 10 are selected
      if (selectedValues.length < 10) {
        setSelectedValues([...selectedValues, value]);
      } else {
        setError('You can only select 10 values. Please deselect one before selecting another.');
      }
    }
  };

  // Handle submission
  const handleSubmit = () => {
    if (selectedValues.length !== 10) {
      setError(`Please select exactly 10 values. You've selected ${selectedValues.length}.`);
      return;
    }
    
    // Store in context
    setTopTenValues(selectedValues);
    
    // Navigate to ranking page
    router.push('/value-sort/ranking');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Select Your Top 10 Values</h1>
          <p className="mt-2 text-gray-600">
            You marked {veryImportantValues.length} values as "Very Important".
            Now, please select the 10 that matter most to you.
          </p>
          <div className="mt-2 text-sm font-medium">
            Selected: <span className={selectedValues.length === 10 ? "text-green-600" : "text-indigo-600"}>
              {selectedValues.length}/10
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {veryImportantValues.map((value) => {
            const isSelected = selectedValues.some(v => v.id === value.id);
            return (
              <div
                key={value.id}
                onClick={() => toggleValueSelection(value)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-100 border-2 border-indigo-500'
                    : 'bg-gray-50 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-lg">{value.text}</div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isSelected
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white border border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">{value.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={() => router.push('/value-sort')}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Sorting
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedValues.length !== 10}
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              selectedValues.length !== 10
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            Continue to Ranking
          </button>
        </div>
      </div>
    </div>
  );
}