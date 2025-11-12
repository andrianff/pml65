import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/odk-api';
import { mockSubmissions } from '@/lib/mock-data';

// Toggle mock mode dengan environment variable
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export async function GET(request: Request) {
  try {
    // Jika mode mock, langsung return mock data
    if (USE_MOCK_DATA) {
      console.log('🎭 Using mock data (ODK Central unavailable)');
      return NextResponse.json(mockSubmissions);
    }

    const formId = process.env.NEXT_PUBLIC_ODK_FORM_ID;

    if (!formId) {
      return NextResponse.json(
        {
          error: 'ODK Form ID not configured',
          message: 'Please add NEXT_PUBLIC_ODK_FORM_ID=shelter_material_survey to your .env.local file'
        },
        { status: 500 }
      );
    }

    console.log(`📥 Fetching submissions for form: ${formId}`);

    const submissions = await getSubmissions(formId);

    console.log(`✅ Successfully fetched ${submissions.length} submissions`);

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('❌ Submissions error:', error);

    // Fallback ke mock data jika terjadi error
    console.log('🎭 Falling back to mock data due to error');
    return NextResponse.json(mockSubmissions);
  }
}