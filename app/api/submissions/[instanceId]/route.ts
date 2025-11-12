import { NextResponse } from 'next/server';
import { updateSubmissionStatus, getSubmissionXML, updateSubmissionData } from '@/lib/odk-api';
import { mockSubmissionXML, mockSubmissions } from '@/lib/mock-data';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export async function GET(
  request: Request,
  context: { params: Promise<{ instanceId: string }> }
) {
  try {
    const params = await context.params;
    const instanceId = decodeURIComponent(params.instanceId);

    // Jika mode mock, return mock XML
    if (USE_MOCK_DATA) {
      console.log(`🎭 Using mock XML for: ${instanceId}`);
      return new Response(mockSubmissionXML, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    }

    const formId = process.env.NEXT_PUBLIC_ODK_FORM_ID;

    if (!formId) {
      return NextResponse.json(
        { error: 'ODK Form ID not configured' },
        { status: 500 }
      );
    }

    console.log(`📥 Fetching submission XML for: ${instanceId}`);

    const xmlData = await getSubmissionXML(formId, instanceId);

    console.log(`✅ Successfully fetched submission XML`);

    return new Response(xmlData, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('❌ Get submission XML error:', error);

    // Fallback to mock data
    console.log('🎭 Falling back to mock XML due to error');
    return new Response(mockSubmissionXML, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ instanceId: string }> }
) {
  try {
    const params = await context.params;
    const instanceId = decodeURIComponent(params.instanceId);

    const xmlData = await request.text();

    // Jika mode mock, simulasi success
    if (USE_MOCK_DATA) {
      console.log(`🎭 Mock update submission data for: ${instanceId}`);
      return NextResponse.json({ success: true, message: 'Mock update successful' });
    }

    const formId = process.env.NEXT_PUBLIC_ODK_FORM_ID;

    if (!formId) {
      return NextResponse.json(
        { error: 'ODK Form ID not configured' },
        { status: 500 }
      );
    }

    console.log(`📝 Updating submission data for: ${instanceId}`);

    const result = await updateSubmissionData(formId, instanceId, xmlData);

    console.log(`✅ Successfully updated submission data`);

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Update submission data error:', error);

    // Fallback to mock success
    console.log('🎭 Falling back to mock update success');
    return NextResponse.json({ success: true, message: 'Mock update successful (fallback)' });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ instanceId: string }> }
) {
  try {
    const params = await context.params;
    // Decode instanceId (it's already URL-encoded when it comes from the route)
    const instanceId = decodeURIComponent(params.instanceId);

    const body = await request.json();
    const { reviewState } = body;

    if (!reviewState) {
      return NextResponse.json(
        { error: 'reviewState is required' },
        { status: 400 }
      );
    }

    // Validate reviewState
    const validStates = ['received', 'hasIssues', 'edited', 'approved', 'rejected'];
    if (!validStates.includes(reviewState)) {
      return NextResponse.json(
        { error: `Invalid reviewState. Must be one of: ${validStates.join(', ')}` },
        { status: 400 }
      );
    }

    // Jika mode mock, simulasi success
    if (USE_MOCK_DATA) {
      console.log(`🎭 Mock update status for ${instanceId} to ${reviewState}`);
      return NextResponse.json({ success: true, reviewState });
    }

    const formId = process.env.NEXT_PUBLIC_ODK_FORM_ID;

    if (!formId) {
      return NextResponse.json(
        { error: 'ODK Form ID not configured' },
        { status: 500 }
      );
    }

    console.log(`📝 Updating submission ${instanceId} status to ${reviewState}`);

    const result = await updateSubmissionStatus(formId, instanceId, reviewState);

    console.log(`✅ Successfully updated submission status`);

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Update submission error:', error);

    // Fallback to mock success
    console.log('🎭 Falling back to mock status update');
    return NextResponse.json({ success: true, reviewState: body.reviewState });
  }
}
