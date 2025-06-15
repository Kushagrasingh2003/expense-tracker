"use client"

import { Badge } from "@/components/ui/badge"

const recentExpenses = [
  {
    id: 1,
    description: "Grocery Shopping",
    category: "Food & Dining",
    amount: 85.5,
    date: "2024-01-15",
  },
  {
    id: 2,
    description: "Gas Station",
    category: "Transportation",
    amount: 45.2,
    date: "2024-01-14",
  },
  {
    id: 3,
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: 15.99,
    date: "2024-01-13",
  },
  {
    id: 4,
    description: "Coffee Shop",
    category: "Food & Dining",
    amount: 12.75,
    date: "2024-01-12",
  },
  {
    id: 5,
    description: "Pharmacy",
    category: "Healthcare",
    amount: 28.4,
    date: "2024-01-11",
  },
]

const categoryColors: Record<string, string> = {
  "Food & Dining": "bg-orange-100 text-orange-800",
  Transportation: "bg-blue-100 text-blue-800",
  Entertainment: "bg-purple-100 text-purple-800",
  Healthcare: "bg-green-100 text-green-800",
  Shopping: "bg-pink-100 text-pink-800",
}

export function RecentExpenses() {
  return (
    <div className="space-y-4">
      {recentExpenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className={categoryColors[expense.category] || "bg-gray-100 text-gray-800"}>
                {expense.category}
              </Badge>
              <span className="text-xs text-gray-500">{expense.date}</span>
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-900">${expense.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}
