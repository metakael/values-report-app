// src/pages/index.tsx
export default function IndexPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Values Report Application</h1>
      <p>Welcome to the Values Report app. Please click the button below to begin.</p>
      <div style={{ marginTop: '1.5rem' }}>
        <a 
          href="/access" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold'
          }}
        >
          Start Assessment
        </a>
      </div>
    </div>
  );
}