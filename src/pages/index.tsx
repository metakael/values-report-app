import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/access');
  }, [router]);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Values Report Application</h1>
      <p>Loading the application...</p>
    </div>
  );
}