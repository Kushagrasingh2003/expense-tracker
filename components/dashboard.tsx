"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { ExpenseList } from "@/components/expense-list"
import { Analytics } from "@/components/analytics"
import { BudgetSettings } from "@/components/budget-settings"

export function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardContent />
      case "expenses":
        return <ExpenseList />
      case "analytics":
        return <Analytics />
      case "budget":
        return <BudgetSettings />
      default:
        return <DashboardContent />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </SidebarProvider>
  )
}
