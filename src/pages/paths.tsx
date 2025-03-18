import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PathsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/access');
    }
  }, [router]);

  const handlePathSelection = async (path) => {
    setIsLoading(true);
    
    // Store the selected path
    localStorage.setItem('selectedPath', path);
    
    // Navigate to the appropriate page
    if (path === 'direct') {
      router.push('/direct-input');
    } else {
      router.push('/value-sort');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Choose Your Path</h1>
      <p style={{ marginBottom: '2rem' }}>
        Select how you would like to identify your top values
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={() => handlePathSelection('sort')}
          disabled={isLoading}
          style={{
            padding: '1.5rem',
            border: '2px solid #4F46E5',
            borderRadius: '0.5rem',
            backgroundColor: 'white',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4F46E5', marginBottom: '0.5rem' }}>
            Do a Value Sort
          </div>
          <p style={{ color: '#6B7280', margin: 0 }}>
            Sort through 65 values one by one to discover what matters most to you
          </p>
        </button>

        <button
          onClick={() => handlePathSelection('direct')}
          disabled={isLoading}
          style={{
            padding: '1.5rem',
            border: '2px solid #9CA3AF',
            borderRadius: '0.5rem',
            backgroundColor: 'white',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4F46E5', marginBottom: '0.5rem' }}>
            I've Already Done It
          </div>
          <p style={{ color: '#6B7280', margin: 0 }}>
            Enter your top 5 values directly if you already know them
          </p>
        </button>
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ 
            display: 'inline-block',
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            borderTop: '3px solid #4F46E5',
            borderRight: '3px solid transparent',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}