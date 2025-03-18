// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the access page
  redirect('/access');
}