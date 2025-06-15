"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, CheckCircle, Save } from "lucide-react"

const budgetCategories = [
  {
    category: "Food & Dining",
    budget: 500,
    spent: 456.78,
    color: "bg-orange-500",
  },
  {
    category: "Transportation",
    budget: 300,
    spent: 234.5,
    color: "bg-blue-500",
  },
  {
    category: "Shopping",
    budget: 200,
    spent: 189.99,
    color: "bg-pink-500",
  },
  {
    category: "Bills & Utilities",
    budget: 400,
    spent: 156.78,
    color: "bg-yellow-500",
  },
  {
    category: "Entertainment",
    budget: 150,
    spent: 98.45,
    color: "bg-purple-500",
  },
  {
    category: "Healthcare",
    budget: 100,
    spent: 67.3,
    color: "bg-green-500",
  },
]

export function BudgetSettings() {
  const [monthlyBudget, setMonthlyBudget] = useState(2000)
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState(80)

  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Budget Settings</h1>
            <p className="text-muted-foreground">Manage your spending limits and alerts</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-6">
        {/* Overall Budget */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget Overview</CardTitle>
            <CardDescription>Your total monthly spending limit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">of ${totalBudget.toFixed(2)} spent</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">${(totalBudget - totalSpent).toFixed(2)} left</p>
                <p className="text-sm text-muted-foreground">{Math.round((totalSpent / totalBudget) * 100)}% used</p>
              </div>
            </div>
            <Progress value={(totalSpent / totalBudget) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Category Budgets */}
        <Card>
          <CardHeader>
            <CardTitle>Category Budgets</CardTitle>
            <CardDescription>Set spending limits for each category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgetCategories.map((category) => {
                const percentage = (category.spent / category.budget) * 100
                const isOverBudget = percentage > 100
                const isNearLimit = percentage > alertThreshold && !isOverBudget

                return (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="font-medium">{category.category}</span>
                        {isOverBudget && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Over Budget
                          </Badge>
                        )}
                        {isNearLimit && (
                          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Near Limit
                          </Badge>
                        )}
                        {!isOverBudget && !isNearLimit && percentage > 0 && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            On Track
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">
                          ${category.spent.toFixed(2)} / ${category.budget.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={Math.min(percentage, 100)} className="flex-1 h-2" />
                      <Input type="number" value={category.budget} className="w-20 h-8 text-xs" min="0" step="10" />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
            <CardDescription>Configure spending alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alerts-enabled" className="text-base font-medium">
                  Enable Spending Alerts
                </Label>
                <p className="text-sm text-muted-foreground">Get notified when you approach your budget limits</p>
              </div>
              <Switch id="alerts-enabled" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            </div>

            {alertsEnabled && (
              <div className="space-y-2">
                <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="alert-threshold"
                    type="number"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(Number(e.target.value))}
                    min="50"
                    max="95"
                    step="5"
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">
                    Alert when {alertThreshold}% of budget is reached
                  </span>
                </div>
              </div>
            )}

            <Button className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
