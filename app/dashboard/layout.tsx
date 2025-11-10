import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
