"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LocationMap() {
  const [isLiveMode, setIsLiveMode] = useState(false)

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-foreground mb-2">Live Location</h2>
        <p className="text-sm text-muted-foreground mb-4">Lokasi real-time pencacah lapangan</p>
        <Button
          size="sm"
          className={isLiveMode ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"}
          onClick={() => setIsLiveMode(!isLiveMode)}
        >
          {isLiveMode ? "🔴 Live Tracking Aktif" : "▶️ Mulai Tracking"}
        </Button>
      </div>

      {/* Map Container */}
      <div className="aspect-square md:aspect-auto md:h-[500px] bg-gradient-to-br from-secondary/20 to-accent/20 relative flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-muted-foreground mb-2">Integrasi Peta</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Peta lokasi real-time akan ditampilkan di sini setelah integrasi API ODK Central
          </p>
        </div>
      </div>

      {/* Status Legend */}
      <div className="p-4 border-t border-border space-y-2">
        <h3 className="text-xs font-semibold text-foreground uppercase mb-3">Status</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Online (6)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-xs text-muted-foreground">Offline (2)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
