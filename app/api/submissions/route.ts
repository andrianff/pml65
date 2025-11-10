import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/odk-api';

export async function GET(request: Request) {
  try {
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
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch submissions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}