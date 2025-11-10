export function validateODKEnvironment() {
  const required = ["NEXT_PUBLIC_ODK_BASE_URL", "NEXT_PUBLIC_ODK_PROJECT_ID", "ODK_EMAIL", "ODK_PASSWORD"]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(
      `[ODK Integration] Missing environment variables: ${missing.join(", ")}\n` +
        "Please configure these in your Vercel project settings:\n" +
        "  NEXT_PUBLIC_ODK_BASE_URL - ODK Central server URL (e.g., https://odk.example.com)\n" +
        "  NEXT_PUBLIC_ODK_PROJECT_ID - ODK Project ID\n" +
        "  ODK_EMAIL - ODK Central admin user email\n" +
        "  ODK_PASSWORD - ODK Central admin user password",
    )
  }

  return missing.length === 0
}
