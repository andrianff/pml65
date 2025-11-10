import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Attempt to authenticate with ODK Central
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
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
