// src/pages/api/auth.js
export default function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Extract credentials from request body
  const { accessCode, email } = req.body;

  // Validate input
  if (!accessCode || !email) {
    return res.status(400).json({
      success: false, 
      message: 'Access code and email are required'
    });
  }

  // For demonstration purposes, accept TEST123 as a valid code
  if (accessCode === 'TEST123') {
    return res.status(200).json({
      success: true,
      message: 'Access code verified successfully',
      sessionId: `test-session-${Date.now()}`
    });
  }

  // Reject any other access code
  return res.status(401).json({
    success: false,
    message: 'Invalid access code'
  });
}