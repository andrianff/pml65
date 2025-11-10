"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface SubmissionFiltersProps {
  filters: {
    status: string
    submitter: string
    wilayah: string
  }
  setFilters: (filters: any) => void
}

export function SubmissionFilters({ filters, setFilters }: SubmissionFiltersProps) {
  const handleStatusChange = (value: string) => {
    setFilters({ ...filters, status: value })
  }

  const handleSubmitterChange = (value: string) => {
    setFilters({ ...filters, submitter: value })
  }

  const handleWilayahChange = (value: string) => {
    setFilters({ ...filters, wilayah: value })
  }

  const handleReset = () => {
    setFilters({ status: "", submitter: "", wilayah: "" })
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Filter Submission</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Status
          </Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="diterima">Diterima</SelectItem>
              <SelectItem value="diubah">Diubah</SelectItem>
              <SelectItem value="bermasalah">Bermasalah</SelectItem>
              <SelectItem value="ditolak">Ditolak</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submitter Filter */}
        <div className="space-y-2">
          <Label htmlFor="submitter" className="text-sm font-medium">
            Pengirim (Submitter)
          </Label>
          <Select value={filters.submitter} onValueChange={handleSubmitterChange}>
            <SelectTrigger id="submitter">
              <SelectValue placeholder="Pilih pengirim" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Pengirim</SelectItem>
              <SelectItem value="budi-santoso">Budi Santoso</SelectItem>
              <SelectItem value="siti-nurhaliza">Siti Nurhaliza</SelectItem>
              <SelectItem value="ahmad-hidayat">Ahmad Hidayat</SelectItem>
              <SelectItem value="dewi-kusuma">Dewi Kusuma</SelectItem>
              <SelectItem value="rudi-hermawan">Rudi Hermawan</SelectItem>
              <SelectItem value="anna-wijaya">Anna Wijaya</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Wilayah Filter */}
        <div className="space-y-2">
          <Label htmlFor="wilayah" className="text-sm font-medium">
            Wilayah Kerja
          </Label>
          <Select value={filters.wilayah} onValueChange={handleWilayahChange}>
            <SelectTrigger id="wilayah">
              <SelectValue placeholder="Pilih wilayah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Wilayah</SelectItem>
              <SelectItem value="yogyakarta-sel">Yogyakarta Sel</SelectItem>
              <SelectItem value="yogyakarta-tim">Yogyakarta Tim</SelectItem>
              <SelectItem value="yogyakarta-utara">Yogyakarta Utara</SelectItem>
              <SelectItem value="yogyakarta-barat">Yogyakarta Barat</SelectItem>
              <SelectItem value="yogyakarta-pusat">Yogyakarta Pusat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex items-end">
          <Button variant="outline" onClick={handleReset} className="w-full bg-transparent">
            Reset Filter
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Filter aktif: <span className="font-semibold">{Object.values(filters).filter((v) => v !== "").length}</span>
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">🔄 Refresh Data</Button>
      </div>
    </div>
  )
}
