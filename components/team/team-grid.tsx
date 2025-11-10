"use client"

import { useEffect, useState } from "react"
import { TeamCard } from "@/components/team/team-card"

interface TeamMember {
  id: string
  name: string
  nim: string
  dataSent: number
  dataApproved: number
  location?: string
  status?: "online" | "offline"
  lastUpdate?: string
}

export function TeamGrid() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("/api/team")
        const data = await response.json()

        // Add default location and status information
        const enhancedData = data.map((member: TeamMember, index: number) => ({
          ...member,
          location: `Yogyakarta ${["Sel", "Tim", "Utara", "Barat", "Pusat"][index % 5]}`,
          status: Math.random() > 0.3 ? "online" : "offline",
          lastUpdate: `${Math.floor(Math.random() * 60)} menit lalu`,
        }))

        setTeamMembers(enhancedData)
      } catch (error) {
        console.error("Failed to fetch team data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [])

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Daftar Pencacah Lapangan</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted rounded-lg p-4 animate-pulse h-48" />
            ))}
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Tidak ada data pencacah</p>
          </div>
        )}
      </div>
    </div>
  )
}
