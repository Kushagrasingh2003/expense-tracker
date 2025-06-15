"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Food & Dining", value: 456.78, color: "#f97316" },
  { name: "Transportation", value: 234.5, color: "#3b82f6" },
  { name: "Shopping", value: 189.99, color: "#ec4899" },
  { name: "Bills & Utilities", value: 156.78, color: "#eab308" },
  { name: "Entertainment", value: 98.45, color: "#8b5cf6" },
  { name: "Healthcare", value: 67.3, color: "#10b981" },
]

export function CategoryChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Amount",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
