const ODK_BASE_URL = process.env.NEXT_PUBLIC_ODK_BASE_URL || "https://odk.example.com"
const ODK_PROJECT_ID = process.env.NEXT_PUBLIC_ODK_PROJECT_ID || "1"
const ODK_EMAIL = process.env.ODK_EMAIL || ""
const ODK_PASSWORD = process.env.ODK_PASSWORD || ""

interface ODKSession {
  token: string
  expiresAt: string
}

class ODKClient {
  private session: ODKSession | null = null
  private sessionPromise: Promise<ODKSession> | null = null

  async authenticate(): Promise<string> {
    // Return cached session if still valid
    if (this.session && new Date(this.session.expiresAt) > new Date()) {
      return this.session.token
    }

    // Prevent concurrent authentication attempts
    if (this.sessionPromise) {
      return (await this.sessionPromise).token
    }

    this.sessionPromise = this.performLogin()
    this.session = await this.sessionPromise
    this.sessionPromise = null

    return this.session.token
  }

  private async performLogin(): Promise<ODKSession> {
    const response = await fetch(`${ODK_BASE_URL}/v1/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: ODK_EMAIL,
        password: ODK_PASSWORD,
      }),
    })

    if (!response.ok) {
      throw new Error(`ODK authentication failed: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      token: data.token,
      expiresAt: data.expiresAt,
    }
  }

  async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = await this.authenticate()

    const headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    }

    const response = await fetch(`${ODK_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      // Session expired, clear and retry
      this.session = null
      return this.fetchWithAuth(endpoint, { ...options, headers: options.headers })
    }

    return response
  }

  getBaseUrl() {
    return ODK_BASE_URL
  }

  getProjectId() {
    return ODK_PROJECT_ID
  }
}

export const odkClient = new ODKClient()
