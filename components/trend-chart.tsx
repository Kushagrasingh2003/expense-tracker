"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Aug", amount: 1245.67 },
  { month: "Sep", amount: 1456.89 },
  { month: "Oct", amount: 1123.45 },
  { month: "Nov", amount: 1678.9 },
  { month: "Dec", amount: 1534.23 },
  { month: "Jan", amount: 1234.56 },
]

export function TrendChart() {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="var(--color-amount)"
            strokeWidth={3}
            dot={{ fill: "var(--color-amount)", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
