"use client"

import { TeamHeader } from "@/components/team/team-header"
import { TeamGrid } from "@/components/team/team-grid"
import { LocationMap } from "@/components/team/location-map"

export default function TeamPage() {
  return (
    <div className="space-y-6 p-6">
      <TeamHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Officers Grid */}
        <div className="lg:col-span-2">
          <TeamGrid />
        </div>

        {/* Map Section */}
        <div className="lg:col-span-1">
          <LocationMap />
        </div>
      </div>
    </div>
  )
}
