# Values Report Web Application

A web application for values assessment and personalized report generation, featuring whitelist-protected access, interactive value sorting, and AI-generated reports.

## Features

- **Access Control**: User authentication via whitelist-protected access codes
- **Two User Paths**:
  - Direct input of top 5 values
  - Interactive sorting process for 65 values
- **AI Report Generation**: Personalized values reports using Google's Gemini API
- **PDF Generation**: Branded PDF reports
- **Email Delivery**: Reports sent directly to users' email addresses

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Database**: Supabase
- **APIs**: Google Gemini AI (preview SDK)
- **Email**: Nodemailer
- **PDF Generation**: PDFKit
- **Drag-and-Drop**: DND Kit
- **Styling**: Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- Google Gemini API key
- SMTP email account

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/values-report-app.git
   cd values-report-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment example file and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Update the `.env.local` file with your actual credentials:
   - Supabase URL and service role key
   - Gemini API key
   - Email server configuration

### Database Setup

1. Create a new Supabase project.

2. Create the following tables in Supabase:

   **access_codes**:
   ```sql
   CREATE TABLE access_codes (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     code TEXT NOT NULL UNIQUE,
     used_count INT NOT NULL DEFAULT 0,
     max_uses INT NOT NULL DEFAULT 1,
     active BOOLEAN NOT NULL DEFAULT true,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **user_sessions**:
   ```sql
   CREATE TABLE user_sessions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT NOT NULL,
     access_code TEXT NOT NULL,
     path_selected TEXT,
     completed BOOLEAN NOT NULL DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **user_values**:
   ```sql
   CREATE TABLE user_values (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     session_id UUID NOT NULL REFERENCES user_sessions(id),
     value TEXT NOT NULL,
     rank INT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. Add at least one access code to the database:
   ```sql
   INSERT INTO access_codes (code, max_uses) VALUES ('YOUR_ACCESS_CODE', 10);
   ```

### Starting the Application

1. Run the development server:
   ```bash
   npm run dev
   ```

2. For production deployment:
   ```bash
   npm run build
   npm run start
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

## Usage

1. Access the application at the URL where it's hosted.
2. Enter an access code and email address.
3. Choose between "Do a Value Sort" or "I've Already Done It".
4. Complete the selected path:
   - Direct input: Enter your top 5 values.
   - Value sort: Sort through values, select top 10, then rank top 5.
5. Receive the personalized values report via email.

## Project Structure

```
values-report-app/
├── public/                     # Static files
│   ├── images/                 # Image assets
│   │   └── logo.png            # Logo for PDF report
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/                # API routes
│   │   ├── components/         # UI components
│   │   ├── contexts/           # React contexts
│   │   ├── lib/                # Utility functions and services
│   │   ├── access/             # Access verification page
│   │   ├── paths/              # Path selection page
│   │   ├── direct-input/       # Direct value input page
│   │   ├── value-sort/         # Value sorting pages
│   │   └── confirmation/       # Confirmation page
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.