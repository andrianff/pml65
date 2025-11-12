"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/submission", label: "Submission", icon: "📝" },
    { href: "/dashboard/team", label: "Data Team", icon: "👥" },
  ]

  return (
    <aside className="w-64 flex flex-col bg-[#ef874b] text-white border-r border-[#fffbdf]">
      {/* Logo Section */}
      <div className="p-6 border-b border-white">
        <div className="flex items-center gap-3">
          {/* Logo di kiri atas */}
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md border border-white">
            <Image
              src="/pkl/LOGO-PKL_REV8.png"
              alt="Logo PKL"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          {/* Tulisan di samping logo */}
          <div className="leading-tight">
            <h2 className="text-4xl font-bold text-white">PKL 65</h2>
            <p className="text-xl text-white/80">PML System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full text-lg justify-start transition-colors",
                  isActive
                    ? "bg-[#fffbdf] text-[#ef874b] font-semibold"
                    : "text-white hover:bg-[#fffbdf]/40 hover:text-white"
                )}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/20 transition-colors"
        >
          <span className="mr-3">🚪</span>
          Logout
        </Button>
      </div>
    </aside>
  )
}
