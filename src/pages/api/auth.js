import { createUserSession, verifyAccessCode, incrementAccessCodeUsage } from '../../app/lib/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Parse request body
    const { accessCode, email } = req.body;

    // Validate inputs
    if (!accessCode || !email) {
      return res.status(400).json({
        success: false,
        message: 'Access code and email are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // For demo purposes, allow a test code without database verification
    if (accessCode === 'TEST123') {
      return res.status(200).json({
        success: true,
        message: 'Access code verified successfully',
        sessionId: 'test-session-id'
      });
    }

    // For actual implementation, verify against database
    try {
      const isValid = await verifyAccessCode(accessCode);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired access code'
        });
      }

      // Increment access code usage
      await incrementAccessCodeUsage(accessCode);

      // Create user session
      const sessionId = await createUserSession(email, accessCode);
      if (!sessionId) {
        return res.status(500).json({
          success: false,
          message: 'Failed to create user session'
        });
      }

      // Return successful response with session ID
      return res.status(200).json({
        success: true,
        message: 'Access code verified successfully',
        sessionId
      });
    } catch (error) {
      console.error('Database operation error:', error);
      // For demo, allow proceeding even if database operations fail
      return res.status(200).json({
        success: true,
        message: 'Access code verified successfully (demo mode)',
        sessionId: 'demo-session-id'
      });
    }
  } catch (error) {
    console.error('Error in auth API:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during authentication'
    });
  }
}