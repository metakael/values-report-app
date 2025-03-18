export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Values Report Application</h1>
      <p>Welcome to the Values Report Application.</p>
      <div>
        <a href="/access" style={{ 
          display: 'inline-block', 
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#4F46E5',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.25rem'
        }}>
          Begin Assessment
        </a>
      </div>
    </div>
  );
}