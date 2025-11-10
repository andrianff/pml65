"use client"

import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan Data Pencacah PKL 65 Polstat STIS</p>
      </div>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">🔄 Refresh</Button>
    </div>
  )
}
