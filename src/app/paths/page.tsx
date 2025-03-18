'use client';
// src/app/paths/page.tsx
import { useRouter } from 'next/navigation';
import { useUser } from '../contexts/UserContext';
import { updateSessionPath } from '../lib/database';
import { useState } from 'react';

export default function PathSelectionPage() {
  const router = useRouter();
  const { user, setSelectedPath } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handlePathSelection = async (path: 'direct' | 'sort') => {
    setIsLoading(true);
    
    try {
      // Update path in context
      setSelectedPath(path);
      
      // Update path in database if session ID exists
      if (user.sessionId) {
        await updateSessionPath(user.sessionId, path);
      }
      
      // Route to the appropriate page
      if (path === 'direct') {
        router.push('/direct-input');
      } else {
        router.push('/value-sort');
      }
    } catch (error) {
      console.error('Error selecting path:', error);
      // Continue with routing even if database update fails
      if (path === 'direct') {
        router.push('/direct-input');
      } else {
        router.push('/value-sort');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Path</h1>
          <p className="mt-2 text-gray-600">
            Select how you would like to identify your top values
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handlePathSelection('sort')}
            disabled={isLoading}
            className="w-full flex flex-col items-center justify-center p-6 border-2 border-indigo-500 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="text-xl font-medium text-indigo-600 mb-2">Do a Value Sort</div>
            <p className="text-gray-600 text-center">
              Sort through 65 values one by one to discover what matters most to you
            </p>
          </button>

          <button
            onClick={() => handlePathSelection('direct')}
            disabled={isLoading}
            className="w-full flex flex-col items-center justify-center p-6 border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="text-xl font-medium text-indigo-600 mb-2">I've Already Done It</div>
            <p className="text-gray-600 text-center">
              Enter your top 5 values directly if you already know them
            </p>
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <div className="spinner border-t-4 border-indigo-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}