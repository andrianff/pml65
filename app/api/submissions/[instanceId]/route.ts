import { NextResponse } from 'next/server';
import { updateSubmissionStatus } from '@/lib/odk-api';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ instanceId: string }> }
) {
  try {
    const { instanceId } = await context.params;
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

    return NextResponse.json(
      {
        error: 'Failed to update submission status',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
