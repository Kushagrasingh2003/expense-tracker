"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentExpenses } from "@/components/recent-expenses"
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, Plus, TrendingUp, Wallet } from "lucide-react"
// import { Auth } from "aws-amplify"

export function DashboardContent() {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    monthlySpend: 0,
    remainingBudget: 0,
    averageDailySpend: 0,
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = "user-123"
        // const uid = user.attributes.sub
        setUserId(user)

        const response = await fetch(`https://hgwz3olg12.execute-api.eu-north-1.amazonaws.com/dashboard?userId=${user}`)
        const data = await response.json()

        setDashboardData({
          totalBalance: data.totalBalance,
          monthlySpend: data.monthlySpend,
          remainingBudget: data.remainingBudget,
          averageDailySpend: data.averageDailySpend,
        })
      } catch (error) {
        console.error("Failed to load dashboard data", error)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Track your expenses and manage your budget</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.totalBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +2.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.monthlySpend.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  +12.3%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Left</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.remainingBudget.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((dashboardData.remainingBudget / (dashboardData.remainingBudget + dashboardData.monthlySpend)) * 100)}% of monthly budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Daily</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.averageDailySpend.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Based on this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Expenses */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
              <CardDescription>Your expenses over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentExpenses />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <Button
        onClick={() => setShowAddExpense(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg sm:hidden"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

    </div>
  )
}
