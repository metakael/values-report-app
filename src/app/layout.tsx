// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from './contexts/UserContext';

// Initialize font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Values Report | Discover Your Core Values',
  description: 'Identify and explore your personal core values with our interactive assessment tool.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}