import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatisticsGrid } from "@/components/dashboard/statistics-grid"
import { SubmissionTable } from "@/components/dashboard/submission-table"

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />
      <StatisticsGrid />
      <SubmissionTable />
    </div>
  )
}
