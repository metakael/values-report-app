'use client';
// src/app/direct-input/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../contexts/UserContext';
import { VALUES_LIST, ValueItem, getValueById } from '../lib/values';

export default function DirectInputPage() {
  const router = useRouter();
  const { user, setTopFiveValues } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ValueItem[]>([]);
  const [selectedValues, setSelectedValues] = useState<Array<ValueItem | null>>([null, null, null, null, null]);
  const [isReportGenerating, setIsReportGenerating] = useState(false);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = VALUES_LIST.filter(
      value => 
        value.text.toLowerCase().includes(lowerCaseSearch) ||
        value.description.toLowerCase().includes(lowerCaseSearch)
    ).slice(0, 10); // Limit to top 10 results
    
    setSearchResults(results);
  }, [searchTerm]);

  // Select a value for a specific rank
  const selectValue = (value: ValueItem, rank: number) => {
    // Check if value is already selected
    const existingIndex = selectedValues.findIndex(v => v && v.id === value.id);
    
    if (existingIndex !== -1 && existingIndex !== rank - 1) {
      // Remove from previous position
      const newValues = [...selectedValues];
      newValues[existingIndex] = null;
      newValues[rank - 1] = value;
      setSelectedValues(newValues);
    } else {
      // Just add to the current position
      const newValues = [...selectedValues];
      newValues[rank - 1] = value;
      setSelectedValues(newValues);
    }

    setSearchTerm('');
    setSearchResults([]);
  };

  // Remove a selected value
  const removeValue = (rank: number) => {
    const newValues = [...selectedValues];
    newValues[rank - 1] = null;
    setSelectedValues(newValues);
  };

  // Submit the selected values
  const handleSubmit = async () => {
    // Check if all values are selected
    if (selectedValues.some(v => v === null)) {
      setError('Please select all 5 values before submitting.');
      return;
    }

    setIsLoading(true);
    setIsReportGenerating(true);
    setError(null);

    try {
      // Convert selected values to ranked values format
      const rankedValues = selectedValues.map((value, index) => ({
        value: value!,
        rank: index + 1
      }));

      // Update context
      setTopFiveValues(rankedValues);

      // Generate report
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: rankedValues.map(({ value, rank }) => ({ id: value.id, rank })),
          email: user.email,
          sessionId: user.sessionId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate report. Please try again.');
      }

      setSuccess('Your values report has been generated and sent to your email.');
      
      // Redirect to confirmation page
      setTimeout(() => {
        router.push('/confirmation');
      }, 2000);
    } catch (error) {
      console.error('Error generating report:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsReportGenerating(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Enter Your Top 5 Values</h1>
          <p className="mt-2 text-gray-600">
            Please rank your top 5 values in order of importance to you.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Value selection area */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full">
                {index + 1}
              </div>
              
              {selectedValues[index] ? (
                <div className="flex-1 flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">{selectedValues[index]?.text}</div>
                    <div className="text-sm text-gray-500">{selectedValues[index]?.description}</div>
                  </div>
                  <button 
                    onClick={() => removeValue(index + 1)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={`Search for value #${index + 1}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setSearchTerm('')}
                    className="w-full p-3 border rounded-md"
                    disabled={isLoading}
                  />
                  
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((value) => (
                        <div
                          key={value.id}
                          onClick={() => selectValue(value, index + 1)}
                          className="p-3 hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="font-medium">{value.text}</div>
                          <div className="text-sm text-gray-500">{value.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={isLoading || selectedValues.some(v => v === null)}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading || selectedValues.some(v => v === null)
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isReportGenerating ? 'Generating Report...' : 'Generate Values Report'}
          </button>
        </div>

        {isReportGenerating && (
          <div className="text-center space-y-4 mt-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
            <p className="text-gray-600">
              We're generating your personalized values report. This might take a moment...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}