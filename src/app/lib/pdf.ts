// src/app/lib/pdf.ts
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import { ValueItem } from './values';
import { marked } from 'marked';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Convert Markdown text to HTML for PDF rendering
 * @param markdown Markdown text
 * @returns HTML string
 */
function markdownToHtml(markdown: string): string {
  return marked(markdown);
}

/**
 * Generate a PDF report from the Gemini-generated content
 * @param reportContent Markdown content from Gemini
 * @param userValues Array of user's top values
 * @param userEmail User's email address
 * @returns PDF as Buffer
 */
export async function generatePDF(
  reportContent: string,
  userValues: { value: ValueItem; rank: number }[],
  userEmail: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a PDF document
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
        info: {
          Title: 'Your Personal Values Report',
          Author: 'Values Report Application',
          Subject: 'Personal Values Analysis',
          Keywords: 'values, personal development, self-awareness',
          Creator: 'Values Report Application',
          Producer: 'PDFKit'
        }
      });

      // Create a buffer to store the PDF
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Add logo
      const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, {
          fit: [150, 150],
          align: 'center'
        });
      }

      // Add cover page
      doc.fontSize(24).fill('#333333').text('Your Personal Values Report', {
        align: 'center',
        lineGap: 20
      });

      const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.fontSize(12).fill('#666666').text(`Created on ${dateStr}`, {
        align: 'center',
        lineGap: 10
      });
      
      doc.fontSize(14).fill('#333333').text(`Prepared for: ${userEmail}`, {
        align: 'center',
        lineGap: 30
      });

      // Add values summary section
      doc.addPage();
      doc.fontSize(18).fill('#333333').text('Your Top 5 Values', {
        align: 'left',
        lineGap: 15
      });

      // Create values table
      const sortedValues = [...userValues].sort((a, b) => a.rank - b.rank);
      
      // Display top values
      for (const { value, rank } of sortedValues) {
        doc
          .fontSize(14)
          .fill('#333333')
          .text(`${rank}. ${value.text}`, {
            lineGap: 5,
            continued: false
          })
          .fontSize(12)
          .fill('#666666')
          .text(value.description, {
            lineGap: 15,
            indent: 20
          });
      }

      // Add the main report content
      doc.addPage();
      
      // Convert markdown to HTML
      const html = markdownToHtml(reportContent);
      
      // Very basic HTML rendering - for more complex handling, consider using a library
      // that properly renders HTML to PDF
      const stripTags = (html: string) => html.replace(/<[^>]*>?/gm, '');
      const processHtml = (html: string) => {
        const headingPattern = /<h(\d)>(.*?)<\/h\d>/g;
        const paragraphPattern = /<p>(.*?)<\/p>/g;
        const listItemPattern = /<li>(.*?)<\/li>/g;
        
        let match;
        let lastIndex = 0;
        
        // Process headings
        while ((match = headingPattern.exec(html)) !== null) {
          const [fullMatch, level, content] = match;
          const fontSize = 20 - parseInt(level) * 2; // h1: 18, h2: 16, etc.
          
          doc.moveDown();
          doc.fontSize(fontSize).fill('#333333').text(content, {
            lineGap: 10
          });
          lastIndex = headingPattern.lastIndex;
        }
        
        // Process paragraphs
        while ((match = paragraphPattern.exec(html)) !== null) {
          const [fullMatch, content] = match;
          
          doc.fontSize(12).fill('#333333').text(stripTags(content), {
            align: 'justify',
            lineGap: 10
          });
          lastIndex = paragraphPattern.lastIndex;
        }
        
        // Process list items
        while ((match = listItemPattern.exec(html)) !== null) {
          const [fullMatch, content] = match;
          
          doc.fontSize(12).fill('#333333').text(`• ${stripTags(content)}`, {
            indent: 20,
            lineGap: 5
          });
          lastIndex = listItemPattern.lastIndex;
        }
        
        // Process any remaining text
        if (lastIndex < html.length) {
          doc.fontSize(12).fill('#333333').text(stripTags(html.substring(lastIndex)), {
            align: 'justify',
            lineGap: 10
          });
        }
      };
      
      processHtml(html);

      // Add footer
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        
        const bottom = doc.page.height - doc.page.margins.bottom;
        doc.fontSize(10).fill('#666666').text(
          `Page ${i + 1} of ${pageCount} | Values Report | Generated ${dateStr}`,
          doc.page.margins.left,
          bottom,
          { align: 'center' }
        );
      }

      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(new Error('Failed to generate PDF report'));
    }
  });
}

/**
 * Convert a Buffer to a Readable stream
 * @param buffer Buffer to convert
 * @returns Readable stream
 */
export function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}