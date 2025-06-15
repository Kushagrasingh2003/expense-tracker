"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", amount: 45.5 },
  { day: "Tue", amount: 78.2 },
  { day: "Wed", amount: 32.1 },
  { day: "Thu", amount: 95.75 },
  { day: "Fri", amount: 123.4 },
  { day: "Sat", amount: 67.8 },
  { day: "Sun", amount: 89.3 },
]

export function ExpenseChart() {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
