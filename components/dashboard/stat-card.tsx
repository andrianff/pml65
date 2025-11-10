"use client"

export interface StatCardProps {
  title: string
  value: string
  description: string
  icon: string
  color: string
}

export function StatCard({ title, value, description, icon, color }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className={`${color} text-white rounded-lg p-3 text-2xl`}>{icon}</div>
      </div>
    </div>
  )
}
