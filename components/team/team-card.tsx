"use client"

import { Button } from "@/components/ui/button"

interface TeamMember {
  id: string
  name: string
  nim: string
  dataSent: number
  dataApproved: number
  location: string
  status: "online" | "offline"
  lastUpdate: string
}

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  const approvalRate = Math.round((member.dataApproved / member.dataSent) * 100)
  const statusColor = member.status === "online" ? "bg-green-500" : "bg-gray-400"
  const statusLabel = member.status === "online" ? "Online" : "Offline"

  return (
    <div className="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
          <p className="text-xs text-muted-foreground">NIM: {member.nim}</p>
        </div>
        <div className={`${statusColor} w-3 h-3 rounded-full mt-1`} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Data Terkirim</span>
          <span className="font-semibold text-foreground">{member.dataSent}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Data Approved</span>
          <span className="font-semibold text-foreground text-green-600">{member.dataApproved}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tingkat Approval</span>
          <span
            className={`font-semibold ${
              approvalRate >= 90 ? "text-green-600" : approvalRate >= 75 ? "text-yellow-600" : "text-red-600"
            }`}
          >
            {approvalRate}%
          </span>
        </div>
      </div>

      <div className="border-t border-border pt-3 mb-3">
        <p className="text-xs text-muted-foreground mb-1">📍 {member.location}</p>
        <p className="text-xs text-muted-foreground">
          {statusLabel} · {member.lastUpdate}
        </p>
      </div>

      <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
        Lihat Detail
      </Button>
    </div>
  )
}
