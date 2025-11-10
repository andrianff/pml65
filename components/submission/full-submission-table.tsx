"use client"

import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SubmissionData {
  instanceId: string
  createdAt: string
  submitterId: number
  submitter?: {
    displayName: string
  }
  currentVersion?: {
    instanceName?: string
  }
  reviewState: "received" | "hasIssues" | "edited" | "approved"
}

interface FullSubmissionTableProps {
  filters: {
    status: string
    submitter: string
    wilayah: string
  }
}

const statusMap: Record<string, string> = {
  received: "diterima",
  hasIssues: "bermasalah",
  edited: "diubah",
  approved: "approved",
}

export function FullSubmissionTable({ filters }: FullSubmissionTableProps) {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/submissions")
        const data = await response.json()
        setSubmissions(data)
      } catch (error) {
        console.error("Failed to fetch submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      if (filters.status && statusMap[sub.reviewState] !== filters.status) return false
      if (
        filters.submitter &&
        sub.submitter?.displayName.toLowerCase() !== filters.submitter.toLowerCase().replace(/-/g, " ")
      )
        return false
      return true
    })
  }, [submissions, filters])

  const statusColors: Record<string, string> = {
    approved: "bg-green-100 text-green-800",
    diterima: "bg-blue-100 text-blue-800",
    diubah: "bg-yellow-100 text-yellow-800",
    bermasalah: "bg-orange-100 text-orange-800",
    ditolak: "bg-red-100 text-red-800",
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Data Submission Lengkap</h2>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">Export</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {loading
            ? "Memuat data..."
            : `Menampilkan ${filteredSubmissions.length} dari ${submissions.length} submission`}
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>NIM Pengirim</TableHead>
              <TableHead>Submitter</TableHead>
              <TableHead>Label Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">Memuat data submission...</p>
                </TableCell>
              </TableRow>
            ) : filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.instanceId}>
                  <TableCell className="text-sm">{new Date(submission.createdAt).toLocaleString("id-ID")}</TableCell>
                  <TableCell className="font-medium">{String(submission.submitterId).padStart(5, "21-")}</TableCell>
                  <TableCell>{submission.submitter?.displayName || "Unknown"}</TableCell>
                  <TableCell>{submission.currentVersion?.instanceName || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${statusColors[statusMap[submission.reviewState]]}`}
                    >
                      {statusMap[submission.reviewState]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">Tidak ada submission yang sesuai dengan filter</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-border text-sm text-muted-foreground flex items-center justify-between">
        <span>Total: {filteredSubmissions.length} submission</span>
        <span className="text-xs">PKL 65 Polstat STIS</span>
      </div>
    </div>
  )
}
