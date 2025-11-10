"use client"

import { useState } from "react"
import { SubmissionFilters } from "@/components/submission/submission-filters"
import { FullSubmissionTable } from "@/components/submission/full-submission-table"

export default function SubmissionPage() {
  const [filters, setFilters] = useState({
    status: "",
    submitter: "",
    wilayah: "",
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Submission</h1>
        <p className="text-muted-foreground">Manajemen lengkap submission Data Pencacah PKL 65 Polstat STIS</p>
      </div>

      {/* Filters */}
      <SubmissionFilters filters={filters} setFilters={setFilters} />

      {/* Table */}
      <FullSubmissionTable filters={filters} />
    </div>
  )
}
