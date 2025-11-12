import type React from "react"
import type { Metadata } from "next"
import { Rakkas, IBM_Plex_Sans, Yanone_Kaffeesatz } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// HEADLINE font
const rakkas = Rakkas({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-headline"
})

// MAIN font (IBM Plex Sans as alternative to Bell Gothic)
const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-main"
})

// SUB/COMPLIMENTS font
const yanoneKaffeesatz = Yanone_Kaffeesatz({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sub"
})

export const metadata: Metadata = {
  title: "PKL 65 PML - STIS",
  description: "Sistem Manajemen Pencacah Lapangan PKL 65 Polstat STIS",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${rakkas.variable} ${ibmPlexSans.variable} ${yanoneKaffeesatz.variable} font-main antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
