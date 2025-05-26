import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebarWithNav } from "@/components/app-sidebar-with-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full">
      <SidebarProvider>
        <AppSidebarWithNav />
        <div className="flex flex-1 flex-col h-screen">
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  )
}
