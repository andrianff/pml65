import { type NextRequest, NextResponse } from "next/server"
import { getSubmissions } from "@/lib/odk-api"

interface SubmissionData {
  submitterId: string
  submitter?: {
    displayName: string
    id: number
  }
}

interface TeamMember {
  id: string
  name: string
  nim: string
  dataSent: number
  dataApproved: number
}

export async function GET(request: NextRequest) {
  try {
    const formId = request.nextUrl.searchParams.get("formId") || "gig_worker_survey"

    const submissions = await getSubmissions(formId)

    // Aggregate submissions by submitter
    const teamMap = new Map<string, TeamMember>()

    submissions.forEach((submission: SubmissionData) => {
      const submitterName = submission.submitter?.displayName || `User ${submission.submitterId}`
      const submitterId = String(submission.submitterId)

      if (!teamMap.has(submitterId)) {
        teamMap.set(submitterId, {
          id: submitterId,
          name: submitterName,
          nim: `21-${String(submission.submitterId).padStart(3, "0")}`,
          dataSent: 0,
          dataApproved: 0,
        })
      }

      const member = teamMap.get(submitterId)!
      member.dataSent += 1

      // Count approved submissions
      if (submission.reviewState === "approved") {
        member.dataApproved += 1
      }
    })

    return NextResponse.json(Array.from(teamMap.values()))
  } catch (error) {
    console.error("Team data error:", error)
    return NextResponse.json({ error: "Failed to fetch team data" }, { status: 500 })
  }
}
