'use client';
// src/app/value-sort/ranking/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/UserContext';
import { ValueItem, RankedValue } from '../../lib/values';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../../components/SortableItem';

export default function RankingPage() {
  const router = useRouter();
  const { user, setTopFiveValues } = useUser();
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  const [rankedValues, setRankedValues] = useState<RankedValue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isReportGenerating, setIsReportGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize sensors for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  // Get top ten values from context
  const topTenValues = user.topTenValues;

  // Check if we need to redirect back
  useEffect(() => {
    if (topTenValues.length === 0) {
      // If no top ten values, redirect to the selection page
      router.push('/value-sort/selection');
    }
  }, [topTenValues.length, router]);

  // Handle value selection for top 5
  const toggleValueSelection = (value: ValueItem) => {
    if (selectedValues.some(v => v.id === value.id)) {
      // Remove if already selected
      setSelectedValues(selectedValues.filter(v => v.id !== value.id));
      setRankedValues(rankedValues.filter(v => v.value.id !== value.id));
    } else {
      // Add if not selected and less than 5 are selected
      if (selectedValues.length < 5) {
        const newSelectedValues = [...selectedValues, value];
        setSelectedValues(newSelectedValues);
        
        // Add to ranked values with initial ranking
        const newRankedValues = [
          ...rankedValues,
          { value, rank: newSelectedValues.length }
        ];
        setRankedValues(newRankedValues);
      } else {
        setError('You can only select 5 values. Please deselect one before selecting another.');
      }
    }
  };

  // Handle drag end for reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setRankedValues((items) => {
        const oldIndex = items.findIndex(item => item.value.id === active.id);
        const newIndex = items.findIndex(item => item.value.id === over.id);
        
        // Update the ranks based on the new order
        const reordered = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          rank: index + 1
        }));
        
        return reordered;
      });
    }
  };

  // Handle submission
  const handleSubmit = async () => {
    if (rankedValues.length !== 5) {
      setError(`Please select exactly 5 values. You've selected ${rankedValues.length}.`);
      return;
    }
    
    setIsLoading(true);
    setIsReportGenerating(true);
    setError(null);

    try {
      // Store in context
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

      // Navigate to confirmation page
      router.push('/confirmation');
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
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Rank Your Top 5 Values</h1>
          <p className="mt-2 text-gray-600">
            Select 5 values from your top 10 and rank them in order of importance to you.
          </p>
          <div className="mt-2 text-sm font-medium">
            Selected: <span className={selectedValues.length === 5 ? "text-green-600" : "text-indigo-600"}>
              {selectedValues.length}/5
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topTenValues.map((value) => {
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

        {rankedValues.length > 0 && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rank Your Top 5 Values</h2>
            <p className="text-gray-600 mb-4">
              Drag and drop to reorder your values by importance (1 being most important).
            </p>
            
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={rankedValues.map(item => item.value.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {rankedValues
                    .sort((a, b) => a.rank - b.rank)
                    .map((rankedValue) => (
                      <SortableItem
                        key={rankedValue.value.id}
                        id={rankedValue.value.id}
                        rank={rankedValue.rank}
                        value={rankedValue.value}
                        onRemove={() => toggleValueSelection(rankedValue.value)}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            onClick={() => router.push('/value-sort/selection')}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled={isLoading}
          >
            Back to Selection
          </button>
          <button
            onClick={handleSubmit}
            disabled={rankedValues.length !== 5 || isLoading}
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              rankedValues.length !== 5 || isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            Generate Report
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