// src/pages/access.tsx (updated Link implementation)
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';

export default function AccessPage() {
  const [email, setEmail] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simplify for demo - just check directly
      if (accessCode === 'TEST123') {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      setError('Invalid access code');
    } catch (error: any) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          backgroundColor: '#ECFDF5', 
          color: '#065F46', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          Authentication successful!
        </div>
        <p>You have been verified with access code: {accessCode}</p>
        
        {/* Updated Link implementation */}
        <Link href="/paths">
          <span style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            marginTop: '1rem',
            cursor: 'pointer'
          }}>
            Continue to Path Selection
          </span>
        </Link>
        
        {/* Fallback button in case Link doesn't work */}
        <div style={{ marginTop: '1rem' }}>
          <button 
            onClick={() => window.location.href = '/paths'}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6B7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Alternative: Click here if the button above doesn't work
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Access Verification</h1>
      
      {error && (
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: '#FEE2E2', 
          color: '#B91C1C',
          borderRadius: '0.375rem',
          marginBottom: '1.5rem'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Email Address
          </label>
          <input 
            type="email" 
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Access Code
          </label>
          <input 
            type="text" 
            value={accessCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccessCode(e.target.value)}
            placeholder="Enter access code"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem'
            }}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem 1.5rem',
            backgroundColor: loading ? '#9CA3AF' : '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Verifying...' : 'Verify Access'}
        </button>
      </form>
    </div>
  );
}