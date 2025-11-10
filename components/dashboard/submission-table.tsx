"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SubmissionData {
  id: string
  timestamp: string
  nim: string
  submitter: string
  labelUnit: string
  status: "diterima" | "diubah" | "bermasalah" | "ditolak" | "approved"
}

export function SubmissionTable() {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([
    {
      id: "1",
      timestamp: "2024-11-10 14:30:25",
      nim: "21-001",
      submitter: "Budi Santoso",
      labelUnit: "Yogyakarta Sel",
      status: "approved",
    },
    {
      id: "2",
      timestamp: "2024-11-10 13:15:10",
      nim: "21-002",
      submitter: "Siti Nurhaliza",
      labelUnit: "Yogyakarta Tim",
      status: "diterima",
    },
    {
      id: "3",
      timestamp: "2024-11-10 12:45:33",
      nim: "21-003",
      submitter: "Ahmad Hidayat",
      labelUnit: "Yogyakarta Utara",
      status: "diubah",
    },
    {
      id: "4",
      timestamp: "2024-11-10 11:20:15",
      nim: "21-004",
      submitter: "Dewi Kusuma",
      labelUnit: "Yogyakarta Barat",
      status: "bermasalah",
    },
    {
      id: "5",
      timestamp: "2024-11-10 10:05:42",
      nim: "21-005",
      submitter: "Rudi Hermawan",
      labelUnit: "Yogyakarta Pusat",
      status: "ditolak",
    },
  ])

  const statusColors = {
    approved: "bg-green-100 text-green-800",
    diterima: "bg-blue-100 text-blue-800",
    diubah: "bg-yellow-100 text-yellow-800",
    bermasalah: "bg-orange-100 text-orange-800",
    ditolak: "bg-red-100 text-red-800",
  }

  const handleStatusChange = (id: string, newStatus: SubmissionData["status"]) => {
    setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub)))
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Submission Terbaru</h2>
          <p className="text-sm text-muted-foreground">Data pencacah PKL 65 Polstat STIS</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">🔄 Refresh</Button>
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
            {submissions.map((submission) => (
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
                      <SelectItem value="ditolak">Ditolak</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-border text-sm text-muted-foreground">
        Total: {submissions.length} submission
      </div>
    </div>
  )
}
