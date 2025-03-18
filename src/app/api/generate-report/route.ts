// src/app/api/generate-report/route.ts
import { NextResponse } from 'next/server';
import { generateValuesReport, generateValuesSummary } from '@/app/lib/gemini';
import { formatValuesForGemini, getValueById } from '@/app/lib/values';
import { generatePDF } from '@/app/lib/pdf';
import { sendReportEmail } from '@/app/lib/email';
import { saveUserValues, markSessionCompleted } from '@/app/lib/database';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      values, 
      email, 
      sessionId 
    } = body;

    // Validate inputs
    if (!values || !Array.isArray(values) || values.length !== 5 || !email || !sessionId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing or invalid required fields. Please provide email, sessionId, and 5 ranked values.' 
        },
        { status: 400 }
      );
    }

    // Transform values to include full value objects
    const valueObjects = values.map(({ id, rank }) => {
      const valueItem = getValueById(id);
      if (!valueItem) {
        throw new Error(`Value with ID ${id} not found`);
      }
      return { value: valueItem, rank };
    });

    // Format values for Gemini prompt
    const formattedValues = formatValuesForGemini(valueObjects);

    // Save values to database
    const valuesSaved = await saveUserValues(
      sessionId,
      valueObjects.map(({ value, rank }) => ({ value: value.id, rank }))
    );

    if (!valuesSaved) {
      console.error('Failed to save user values to database');
      // Continue with report generation even if saving fails
    }

    // Generate report with Gemini
    const reportContent = await generateValuesReport(formattedValues, email);
    
    // Generate summary for email
    const summaryText = await generateValuesSummary(formattedValues);

    // Generate PDF
    const pdfBuffer = await generatePDF(reportContent, valueObjects, email);

    // Send email with PDF
    const emailSent = await sendReportEmail({
      userEmail: email,
      pdfBuffer,
      summaryText,
      topValues: valueObjects
    });

    // Mark session as completed
    await markSessionCompleted(sessionId);

    // Return response
    return NextResponse.json({
      success: true,
      message: 'Report generated and sent successfully',
      emailSent,
      reportContent: reportContent.substring(0, 200) + '...' // Preview of report for confirmation
    });
  } catch (error) {
    console.error('Error in generate-report API:', error);
    let errorMessage = 'An error occurred while generating your report';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}