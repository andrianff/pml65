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

    console.log(`📥 Fetching team data from form: ${formId}`);
    
    const submissions = await getSubmissions(formId);
    
    // Aggregate submissions by submitter
    const teamMap = new Map();
    
    submissions.forEach((submission: any) => {
      const submitter = submission.submitter || 'Unknown';
      
      if (!teamMap.has(submitter)) {
        teamMap.set(submitter, {
          submitter,
          totalSubmissions: 0,
          approvedSubmissions: 0,
          location: 'Unknown',
          online: Math.random() > 0.5, // Mock online status
        });
      }
      
      const team = teamMap.get(submitter);
      team.totalSubmissions++;
      
      if (submission.reviewState === 'approved') {
        team.approvedSubmissions++;
      }
    });
    
    const teamData = Array.from(teamMap.values()).map(team => ({
      ...team,
      approvalRate: team.totalSubmissions > 0 
        ? Math.round((team.approvedSubmissions / team.totalSubmissions) * 100)
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
