import { type NextRequest, NextResponse } from "next/server"
import { getSubmissions } from "@/lib/odk-api"

export async function GET(request: NextRequest) {
  try {
    const formId = request.nextUrl.searchParams.get("formId") || "gig_worker_survey"

    const submissions = await getSubmissions(formId)

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Submissions error:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
