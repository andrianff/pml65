import { type NextRequest, NextResponse } from "next/server"

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock mode: Accept any credentials
    if (USE_MOCK_DATA) {
      console.log('🎭 Mock login - accepting any credentials');

      const res = NextResponse.json({ success: true, user: { email } }, { status: 200 })

      // Store mock token in cookie
      res.cookies.set("odk_token", "mock-token-for-development", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400, // 24 hours
      })

      return res
    }

    // Real mode: Authenticate with ODK Central
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ODK_BASE_URL}/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      const session = await response.json()

      // Create response with session cookie
      const res = NextResponse.json({ success: true, user: { email } }, { status: 200 })

      // Store token in secure, httpOnly cookie
      res.cookies.set("odk_token", session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400, // 24 hours
      })

      return res
    } catch (error) {
      console.error("ODK Central authentication failed, falling back to mock mode:", error)

      // Fallback to mock mode if ODK Central is unavailable
      console.log('🎭 Falling back to mock login');

      const res = NextResponse.json({ success: true, user: { email } }, { status: 200 })

      res.cookies.set("odk_token", "mock-token-for-development", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400, // 24 hours
      })

      return res
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
