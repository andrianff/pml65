import { odkClient } from "./odk-client"

export async function getSubmissions(formId: string) {
  const projectId = odkClient.getProjectId()
  const response = await odkClient.fetchWithAuth(
    `/v1/projects/${projectId}/forms/${formId}/submissions`,
    {
      headers: {
        'X-Extended-Metadata': 'true',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch submissions: ${response.statusText}`)
  }

  return response.json()
}

export async function getSubmissionMetadata(formId: string, instanceId: string) {
  const projectId = odkClient.getProjectId()
  const response = await odkClient.fetchWithAuth(
    `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}?X-Extended-Metadata=true`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch submission: ${response.statusText}`)
  }

  return response.json()
}

export async function getFormsList() {
  const projectId = odkClient.getProjectId()
  const response = await odkClient.fetchWithAuth(`/v1/projects/${projectId}/forms?X-Extended-Metadata=true`)

  if (!response.ok) {
    throw new Error(`Failed to fetch forms: ${response.statusText}`)
  }

  return response.json()
}

export async function getProjects() {
  const response = await odkClient.fetchWithAuth(`/v1/projects?X-Extended-Metadata=true`)

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`)
  }

  return response.json()
}

export async function updateSubmissionStatus(
  formId: string,
  instanceId: string,
  reviewState: "approved" | "hasIssues" | "edited" | "received" | "rejected",
) {
  const projectId = odkClient.getProjectId()

  // Map "rejected" to ODK's "hasIssues" with a special flag
  // Since ODK doesn't support "rejected" natively, we use "hasIssues" for rejected items
  let odkReviewState = reviewState
  if (reviewState === "rejected") {
    odkReviewState = "hasIssues" // Map rejected to hasIssues in ODK
  }

  const response = await odkClient.fetchWithAuth(
    `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewState: odkReviewState,
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to update submission status: ${response.statusText}`)
  }

  return response.json()
}
