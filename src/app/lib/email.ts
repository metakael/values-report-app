// src/app/lib/email.ts
import nodemailer from 'nodemailer';
import { ValueItem } from './values';
import { bufferToStream } from './pdf';

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

interface SendReportEmailParams {
  userEmail: string;
  pdfBuffer: Buffer;
  summaryText: string;
  topValues: { value: ValueItem; rank: number }[];
}

/**
 * Send the values report PDF via email
 * @param params Email parameters including recipient, PDF buffer, and summary
 * @returns Promise resolving to boolean indicating success
 */
export async function sendReportEmail({
  userEmail,
  pdfBuffer,
  summaryText,
  topValues
}: SendReportEmailParams): Promise<boolean> {
  try {
    // Format the values list for email body
    const formattedValues = topValues
      .sort((a, b) => a.rank - b.rank)
      .map(({ value, rank }) => `${rank}. ${value.text}`)
      .join('\n');

    // Prepare email content
    const mailOptions = {
      from: `"Values Report" <${process.env.EMAIL_FROM}>`,
      to: userEmail,
      subject: 'Your Personal Values Report',
      text: `
Dear ${userEmail},

Thank you for completing the values assessment. We're pleased to provide your personal values report.

YOUR TOP 5 VALUES:
${formattedValues}

SUMMARY:
${summaryText}

The attached PDF contains your comprehensive personal values report. This report offers deeper insights into your core values and practical guidance for living in alignment with them.

If you have any questions or feedback about your report, please don't hesitate to contact us.

Best regards,
The Values Report Team
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      border-bottom: 3px solid #007bff;
    }
    .content {
      padding: 20px;
    }
    .values-list {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .summary {
      background-color: #f0f7ff;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      border-left: 3px solid #007bff;
    }
    .footer {
      font-size: 12px;
      text-align: center;
      margin-top: 30px;
      color: #666;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Your Personal Values Report</h1>
  </div>
  
  <div class="content">
    <p>Dear ${userEmail},</p>
    
    <p>Thank you for completing the values assessment. We're pleased to provide your personal values report.</p>
    
    <div class="values-list">
      <h2>YOUR TOP 5 VALUES:</h2>
      <ol>
        ${topValues
          .sort((a, b) => a.rank - b.rank)
          .map(({ value }) => `<li><strong>${value.text}</strong></li>`)
          .join('')}
      </ol>
    </div>
    
    <div class="summary">
      <h2>SUMMARY:</h2>
      <p>${summaryText.replace(/\n/g, '<br>')}</p>
    </div>
    
    <p>The attached PDF contains your comprehensive personal values report. This report offers deeper insights into your core values and practical guidance for living in alignment with them.</p>
    
    <p>If you have any questions or feedback about your report, please don't hesitate to contact us.</p>
    
    <p>Best regards,<br>The Values Report Team</p>
  </div>
  
  <div class="footer">
    <p>This email was sent to ${userEmail} as part of the Values Report service.</p>
  </div>
</body>
</html>
      `,
      attachments: [
        {
          filename: 'Your_Values_Report.pdf',
          content: pdfBuffer
        }
      ]
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Test if email configuration is working
 * @returns Boolean indicating if configuration is valid
 */
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}