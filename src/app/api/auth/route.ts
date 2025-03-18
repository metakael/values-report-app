// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { verifyAccessCode, incrementAccessCodeUsage, createUserSession } from '@/app/lib/database';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { accessCode, email } = body;

    // Validate inputs
    if (!accessCode || !email) {
      return NextResponse.json(
        { success: false, message: 'Access code and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Verify access code
    const isValid = await verifyAccessCode(accessCode);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired access code' },
        { status: 401 }
      );
    }

    // Increment access code usage
    await incrementAccessCodeUsage(accessCode);

    // Create user session
    const sessionId = await createUserSession(email, accessCode);
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Failed to create user session' },
        { status: 500 }
      );
    }

    // Return successful response with session ID
    return NextResponse.json({
      success: true,
      message: 'Access code verified successfully',
      sessionId
    });
  } catch (error) {
    console.error('Error in auth API:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}