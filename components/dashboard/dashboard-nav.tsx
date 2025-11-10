"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      href: "/dashboard/submission",
      label: "Submission",
      icon: "📝",
    },
    {
      href: "/dashboard/team",
      label: "Data Team",
      icon: "👥",
    },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="text-center">
          <h2 className="text-xl font-bold text-sidebar-primary mb-1">PKL 65</h2>
          <p className="text-xs text-sidebar-foreground/70">PML System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground",
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
          <span className="mr-3">🚪</span>
          Logout
        </Button>
      </div>
    </aside>
  )
}
