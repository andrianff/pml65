"use client"

import { Button } from "@/components/ui/button"

export function TeamHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Team</h1>
        <p className="text-muted-foreground">Informasi Pencacah PKL 65 Polstat STIS</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="text-sm bg-transparent">
          📥 Import
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">🔄 Sync</Button>
      </div>
    </div>
  )
}
