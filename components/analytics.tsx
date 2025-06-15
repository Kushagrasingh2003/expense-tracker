"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryChart } from "@/components/category-chart"
import { TrendChart } from "@/components/trend-chart"
import { MonthlyComparison } from "@/components/monthly-comparison"

export function Analytics() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Insights into your spending patterns</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                  <CardDescription>Your expenses breakdown for this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Your highest spending categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Food & Dining", amount: 456.78, percentage: 35 },
                      { category: "Transportation", amount: 234.5, percentage: 18 },
                      { category: "Shopping", amount: 189.99, percentage: 15 },
                      { category: "Bills & Utilities", amount: 156.78, percentage: 12 },
                      { category: "Entertainment", amount: 98.45, percentage: 8 },
                    ].map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{item.category}</span>
                            <span className="text-sm text-muted-foreground">${item.amount}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>Your spending patterns over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <TrendChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
                <CardDescription>Compare your spending across different months</CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyComparison />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
