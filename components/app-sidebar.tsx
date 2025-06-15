"use client"

import { BarChart3, CreditCard, DollarSign, Home, PieChart, Settings, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Expenses",
    icon: CreditCard,
    id: "expenses",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "Budget",
    icon: PieChart,
    id: "budget",
  },
]

interface AppSidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center space-x-2 px-2 py-2">
          <div className="p-1 bg-blue-600 rounded">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-lg">ExpenseTracker</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onViewChange(item.id)} isActive={activeView === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User className="h-4 w-4" />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
