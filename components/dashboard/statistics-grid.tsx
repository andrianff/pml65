"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/dashboard/stat-card"

interface SubmissionStats {
  total: number
  approved: number
  diubah: number
  bermasalah: number
  ditolak: number
  diterima: number
}

export function StatisticsGrid() {
  const [stats, setStats] = useState<SubmissionStats>({
    total: 0,
    approved: 0,
    diubah: 0,
    bermasalah: 0,
    ditolak: 0,
    diterima: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/submissions")
        const submissions = await response.json()

        const counts = {
          total: submissions.length,
          approved: submissions.filter((s: any) => s.reviewState === "approved").length,
          diterima: submissions.filter((s: any) => s.reviewState === "received").length,
          diubah: submissions.filter((s: any) => s.reviewState === "edited").length,
          bermasalah: submissions.filter((s: any) => s.reviewState === "hasIssues").length,
          ditolak: 0, // ODK Central doesn't have a "rejected" state by default
        }

        setStats(counts)
      } catch (error) {
        console.error("Failed to fetch statistics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const displayStats = [
    {
      title: "Sisa Waktu Pencacahan",
      value: "12 Hari",
      description: "Aktivitas keseluruhan",
      icon: "⏱️",
      color: "bg-primary",
    },
    {
      title: "Total Submission",
      value: loading ? "-" : String(stats.total),
      description: "Data masuk",
      icon: "📨",
      color: "bg-accent",
    },
    {
      title: "Diterima",
      value: loading ? "-" : String(stats.diterima),
      description: "Status received",
      icon: "✅",
      color: "bg-blue-500",
    },
    {
      title: "Diubah",
      value: loading ? "-" : String(stats.diubah),
      description: "Perlu revisi",
      icon: "✏️",
      color: "bg-yellow-500",
    },
    {
      title: "Bermasalah",
      value: loading ? "-" : String(stats.bermasalah),
      description: "Memerlukan tindakan",
      icon: "⚠️",
      color: "bg-orange-500",
    },
    {
      title: "Ditolak",
      value: loading ? "-" : String(stats.ditolak),
      description: "Submission ditolak",
      icon: "❌",
      color: "bg-red-600",
    },
    {
      title: "Approved",
      value: loading ? "-" : String(stats.approved),
      description: "Valid dan siap",
      icon: "✔️",
      color: "bg-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayStats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
