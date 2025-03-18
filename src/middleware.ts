// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the paths that should be protected
const PROTECTED_PATHS = [
  '/paths',
  '/direct-input',
  '/value-sort',
  '/value-sort/selection',
  '/value-sort/ranking',
  '/confirmation'
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Check if the path should be protected
  if (PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
    // Check for authentication in cookies or session
    const isAuthenticated = request.cookies.has('authenticated') && 
                           request.cookies.get('authenticated')?.value === 'true';
    
    if (!isAuthenticated) {
      // Redirect to access page if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/access';
      return NextResponse.redirect(url);
    }
  }

  // Continue with the request if authenticated or not a protected path
  return NextResponse.next();
}

// Configure the paths that trigger this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};