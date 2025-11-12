import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/odk-api';
import { mockSubmissions } from '@/lib/mock-data';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export async function GET() {
  try {
    let submissions;

    // Jika mode mock, gunakan mock data
    if (USE_MOCK_DATA) {
      console.log('🎭 Using mock data for team');
      submissions = mockSubmissions;
    } else {
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

      console.log(`📥 Fetching team data from form: ${formId}`);

      try {
        submissions = await getSubmissions(formId);
      } catch (error) {
        console.log('🎭 Falling back to mock data for team');
        submissions = mockSubmissions;
      }
    }
    
    // Aggregate submissions by submitter
    const teamMap = new Map();

    submissions.forEach((submission: any) => {
      const submitterId = submission.submitterId || 0;
      const displayName = submission.submitter?.displayName || `User ${submitterId}`;

      if (!teamMap.has(submitterId)) {
        // Extract NIM from displayName (pattern: XX-XXX)
        const nimMatch = displayName.match(/\d{2}-\d{3}/);

        teamMap.set(submitterId, {
          id: String(submitterId), // Unique ID for React key
          name: displayName,
          nim: nimMatch ? nimMatch[0] : '-',
          dataSent: 0,
          dataApproved: 0,
          location: 'Unknown',
          online: Math.random() > 0.5, // Mock online status
        });
      }

      const team = teamMap.get(submitterId);
      team.dataSent++;

      if (submission.reviewState === 'approved') {
        team.dataApproved++;
      }
    });

    const teamData = Array.from(teamMap.values()).map(team => ({
      ...team,
      approvalRate: team.dataSent > 0
        ? Math.round((team.dataApproved / team.dataSent) * 100)
        : 0,
    }));
    
    console.log(`✅ Aggregated data for ${teamData.length} team members`);
    
    return NextResponse.json(teamData);
  } catch (error) {
    console.error('❌ Team data error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch team data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}