// src/pages/access.tsx
export default function AccessPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Access Verification</h1>
      <p>This is the access verification page.</p>
      <form style={{ marginTop: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Email Address
          </label>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem'
            }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Access Code
          </label>
          <input 
            type="text" 
            placeholder="Enter access code"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem'
            }}
          />
        </div>
        <button
          type="button"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Verify Access
        </button>
      </form>
    </div>
  );
}