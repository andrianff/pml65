"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubmissionDetailDialog } from "@/components/submission/submission-detail-dialog"

// ODK Central API Response Types
interface ODKSubmission {
  instanceId: string
  submitterId: number
  deviceId?: string
  userAgent?: string
  reviewState: "received" | "hasIssues" | "edited" | "approved" | null
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  currentVersion: {
    instanceId: string
    instanceName?: string
    submitterId: number
    deviceId?: string
    userAgent?: string
    createdAt: string
    current: boolean
  }
  submitter?: {
    createdAt: string
    displayName: string
    id: number
    type: string
    updatedAt: string | null
    deletedAt: string | null
  }
}

interface SubmissionData {
  id: string
  timestamp: string
  nim: string
  submitter: string
  labelUnit: string
  status: "diterima" | "diubah" | "bermasalah" | "approved" | "ditolak"
}

// Map ODK reviewState to Indonesian status
const mapReviewStateToStatus = (reviewState: string | null): SubmissionData["status"] => {
  switch (reviewState) {
    case "approved":
      return "approved"
    case "hasIssues":
      return "bermasalah"
    case "edited":
      return "diubah"
    case "received":
    default:
      return "diterima"
  }
}

// Map Indonesian status back to ODK reviewState
const mapStatusToReviewState = (status: SubmissionData["status"]): string => {
  switch (status) {
    case "approved":
      return "approved"
    case "bermasalah":
      return "hasIssues"
    case "diubah":
      return "edited"
    case "ditolak":
      return "rejected"
    case "diterima":
    default:
      return "received"
  }
}

export function SubmissionTable() {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)

  // Fetch submissions from API
  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/submissions")

      if (!response.ok) {
        throw new Error("Failed to fetch submissions")
      }

      const data: ODKSubmission[] = await response.json()

      // Transform ODK data to our format
      // Sort by createdAt descending and take latest 10
      const transformedData: SubmissionData[] = data
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
        .map((submission) => ({
          id: submission.instanceId,
          timestamp: new Date(submission.createdAt).toLocaleString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          nim: submission.submitter?.displayName?.match(/\d{2}-\d{3}/)?.[0] || "-",
          submitter: submission.submitter?.displayName || `User ${submission.submitterId}`,
          labelUnit: submission.currentVersion.instanceName || "-",
          status: mapReviewStateToStatus(submission.reviewState),
        }))

      setSubmissions(transformedData)
    } catch (err) {
      console.error("Error fetching submissions:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  // Load submissions on mount
  useEffect(() => {
    fetchSubmissions()
  }, [])

  const statusColors = {
    approved: "bg-green-100 text-green-800",
    diterima: "bg-blue-100 text-blue-800",
    diubah: "bg-yellow-100 text-yellow-800",
    bermasalah: "bg-orange-100 text-orange-800",
    ditolak: "bg-red-100 text-red-800",
  }

  const handleStatusChange = async (id: string, newStatus: SubmissionData["status"]) => {
    try {
      // Optimistically update UI
      setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub)))

      // Update status in ODK Central
      const reviewState = mapStatusToReviewState(newStatus)

      // Encode instanceId for URL
      const encodedId = encodeURIComponent(id)

      const response = await fetch(`/api/submissions/${encodedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewState }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update status")
      }

      console.log(`✅ Status updated successfully for ${id}`)

      // Refresh to get latest data
      await fetchSubmissions()
    } catch (err) {
      console.error("Error updating status:", err)
      // Revert on error
      await fetchSubmissions()
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Submission Terbaru</h2>
          <p className="text-sm text-muted-foreground">Data pencacah PKL 65 Polstat STIS</p>
        </div>
        <Button
          onClick={fetchSubmissions}
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? "⏳ Loading..." : "🔄 Refresh"}
        </Button>
      </div>

      {error && (
        <div className="p-4 mx-6 mt-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

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
            {loading && submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Memuat data submission...
                </TableCell>
              </TableRow>
            ) : submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Tidak ada data submission
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="text-sm">{submission.timestamp}</TableCell>
                  <TableCell className="font-medium">{submission.nim}</TableCell>
                  <TableCell>{submission.submitter}</TableCell>
                  <TableCell>{submission.labelUnit}</TableCell>
                  <TableCell>
                    <Select
                      value={submission.status}
                      onValueChange={(value) => handleStatusChange(submission.id, value as SubmissionData["status"])}
                    >
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
                        setSelectedSubmissionId(submission.id)
                        setDialogOpen(true)
                      }}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-border text-sm text-muted-foreground">
        Total: {submissions.length} submission terbaru
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
