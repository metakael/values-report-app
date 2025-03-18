'use client';
// src/app/confirmation/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';

export default function ConfirmationPage() {
  const router = useRouter();
  const { user, resetState } = useUser();

  // Redirect if no email (user hasn't gone through the process)
  useEffect(() => {
    if (!user.email) {
      router.push('/access');
    }
  }, [user.email, router]);

  // Handle restart of the process
  const handleRestart = () => {
    resetState();
    router.push('/access');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md text-center">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Report Sent!</h1>
        
        <div className="text-gray-600">
          <p className="mb-4">
            Your personalized values report has been generated and sent to <strong>{user.email}</strong>.
          </p>
          <p>
            Please check your inbox (and spam folder if necessary) for an email containing your report.
          </p>
        </div>

        <div className="pt-6 border-t">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Top 5 Values</h2>
          <div className="space-y-2">
            {user.topFiveValues
              .sort((a, b) => a.rank - b.rank)
              .map(({ value, rank }) => (
                <div key={value.id} className="flex items-center p-2 bg-indigo-50 rounded-md">
                  <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full mr-3">
                    {rank}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{value.text}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={handleRestart}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
          >
            Start a New Assessment
          </button>
        </div>
      </div>
    </div>
  );
}