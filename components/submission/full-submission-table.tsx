"use client"

import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubmissionDetailDialog } from "./submission-detail-dialog"

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
  reviewState: "received" | "hasIssues" | "edited" | "approved" | null
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
  rejected: "ditolak",
}

const reverseStatusMap: Record<string, string> = {
  diterima: "received",
  bermasalah: "hasIssues",
  diubah: "edited",
  approved: "approved",
  ditolak: "rejected",
}

export function FullSubmissionTable({ filters }: FullSubmissionTableProps) {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/submissions")
      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error("Failed to fetch submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const handleStatusChange = async (instanceId: string, newStatus: string) => {
    try {
      // Optimistically update UI
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.instanceId === instanceId
            ? { ...sub, reviewState: reverseStatusMap[newStatus] as SubmissionData["reviewState"] }
            : sub
        )
      )

      const encodedId = encodeURIComponent(instanceId)
      const reviewState = reverseStatusMap[newStatus]

      const response = await fetch(`/api/submissions/${encodedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewState }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        let errorMessage = "Failed to update status"

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } else {
          const text = await response.text()
          console.error("Non-JSON response:", text.substring(0, 200))
        }

        throw new Error(errorMessage)
      }

      console.log(`✅ Status updated successfully for ${instanceId}`)

      // Refresh data
      await fetchSubmissions()
    } catch (error) {
      console.error("Error updating status:", error)
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
      // Revert on error
      await fetchSubmissions()
    }
  }

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const mappedStatus = sub.reviewState ? statusMap[sub.reviewState] : "diterima"
      if (filters.status && mappedStatus !== filters.status) return false
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
              filteredSubmissions.map((submission) => {
                const currentStatus = submission.reviewState ? statusMap[submission.reviewState] : "diterima"
                return (
                  <TableRow key={submission.instanceId}>
                    <TableCell className="text-sm">{new Date(submission.createdAt).toLocaleString("id-ID")}</TableCell>
                    <TableCell className="font-medium">
                      {submission.submitter?.displayName?.match(/\d{2}-\d{3}/)?.[0] || "-"}
                    </TableCell>
                    <TableCell>{submission.submitter?.displayName || "Unknown"}</TableCell>
                    <TableCell>{submission.currentVersion?.instanceName || "-"}</TableCell>
                    <TableCell>
                      <Select value={currentStatus} onValueChange={(value) => handleStatusChange(submission.instanceId, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diterima">Diterima</SelectItem>
                          <SelectItem value="diubah">Diubah</SelectItem>
                          <SelectItem value="bermasalah">Bermasalah</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="ditolak">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs bg-transparent"
                        onClick={() => {
                          setSelectedSubmissionId(submission.instanceId)
                          setDialogOpen(true)
                        }}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
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

      {/* Detail Dialog */}
      {selectedSubmissionId && (
        <SubmissionDetailDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          instanceId={selectedSubmissionId}
          onSave={() => {
            // Refresh submissions after save
            fetchSubmissions()
          }}
        />
      )}
    </div>
  )
}
