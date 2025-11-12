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

export async function getSubmissionXML(formId: string, instanceId: string) {
  const projectId = odkClient.getProjectId()
  const response = await odkClient.fetchWithAuth(
    `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}.xml`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch submission XML: ${response.statusText}`)
  }

  return response.text()
}

export async function updateSubmissionData(
  formId: string,
  instanceId: string,
  xmlData: string
) {
  const projectId = odkClient.getProjectId()

  console.log(`🔍 ODK PUT Request (Update Data):`, {
    url: `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}`,
    xmlLength: xmlData.length
  })

  const response = await odkClient.fetchWithAuth(
    `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/xml",
      },
      body: xmlData,
    }
  )

  if (!response.ok) {
    let errorDetails = response.statusText
    try {
      const errorBody = await response.json()
      errorDetails = errorBody.message || errorBody.error || JSON.stringify(errorBody)
    } catch (e) {
      // If response is not JSON, use statusText
    }

    console.error(`ODK API Error: ${response.status} ${errorDetails}`)
    throw new Error(`Failed to update submission data: ${errorDetails}`)
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

  const url = `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}`
  const body = { reviewState: odkReviewState }

  console.log(`🔍 ODK PATCH Request:`, {
    url,
    body,
    formId,
    instanceId,
    reviewState,
    odkReviewState
  })

  const response = await odkClient.fetchWithAuth(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    // Get error details from ODK Central
    let errorDetails = response.statusText
    try {
      const errorBody = await response.json()
      errorDetails = errorBody.message || errorBody.error || JSON.stringify(errorBody)
    } catch (e) {
      // If response is not JSON, use statusText
    }

    console.error(`ODK API Error: ${response.status} ${errorDetails}`)
    throw new Error(`Failed to update submission status: ${errorDetails}`)
  }

  return response.json()
}
