"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Aug", thisYear: 1245.67, lastYear: 1156.78 },
  { month: "Sep", thisYear: 1456.89, lastYear: 1234.56 },
  { month: "Oct", thisYear: 1123.45, lastYear: 1345.67 },
  { month: "Nov", thisYear: 1678.9, lastYear: 1456.78 },
  { month: "Dec", thisYear: 1534.23, lastYear: 1678.9 },
  { month: "Jan", thisYear: 1234.56, lastYear: 1123.45 },
]

export function MonthlyComparison() {
  return (
    <ChartContainer
      config={{
        thisYear: {
          label: "This Year",
          color: "hsl(var(--chart-1))",
        },
        lastYear: {
          label: "Last Year",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="thisYear" fill="var(--color-thisYear)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="lastYear" fill="var(--color-lastYear)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
