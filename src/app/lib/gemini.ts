// src/app/lib/gemini.ts
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Create a model instance
let model: GenerativeModel;

/**
 * Initialize the Gemini model
 * @returns The initialized model instance
 */
function initializeModel(): GenerativeModel {
  if (!model) {
    // Using 'gemini-pro' for text generation as specified in the preview SDK
    model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }
  return model;
}

/**
 * Generate a personalized report based on the user's top values
 * @param values Formatted string of user's top values
 * @param email User's email for personalization
 * @returns Generated report content as string
 */
export async function generateValuesReport(
  values: string,
  email: string
): Promise<string> {
  const model = initializeModel();

  // Construct prompt for Gemini
  const prompt = `
    Generate a personalized, insightful report about the core values that shape a person's life and decisions. 
    
    The user has identified their top 5 values as:
    
    ${values}
    
    Create a comprehensive report that includes the following sections:
    
    1. Introduction: A personalized greeting to ${email} and an overview of what personal values are and why they're important.
    
    2. Core Values Analysis: For each of the 5 values, provide:
       - A deep exploration of what this value truly means
       - How this value might manifest in their personal and professional life
       - Potential strengths this value brings them
       - Potential challenges this value might present
    
    3. Values in Harmony: Analyze how these 5 values work together, identifying any natural synergies or potential conflicts.
    
    4. Living Your Values: Practical suggestions for:
       - How to honor these values in daily life
       - How to use these values for decision-making
       - Ways to strengthen these values through intentional practices
    
    5. Conclusion: A motivational summary that encourages the user to live authentically aligned with their values.
    
    Format the report in clear, well-structured Markdown with appropriate headers and sections. Make it personal, insightful, and actionable - not generic. The tone should be warm, thoughtful, and professional.
    
    The report should be comprehensive but concise, approximately 1500-2000 words.
  `;

  try {
    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating report with Gemini:', error);
    throw new Error('Failed to generate values report. Please try again later.');
  }
}

/**
 * Generate a shorter summary of the values for email preview
 * @param values Formatted string of user's top values
 * @returns Generated summary as string
 */
export async function generateValuesSummary(values: string): Promise<string> {
  const model = initializeModel();

  // Construct prompt for a brief summary
  const prompt = `
    Based on the following top 5 personal values:
    
    ${values}
    
    Create a brief summary (150-200 words) that highlights the core essence of these values 
    and what they might reveal about the person who holds them. Keep the tone warm and insightful.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating values summary with Gemini:', error);
    throw new Error('Failed to generate values summary. Please try again later.');
  }
}