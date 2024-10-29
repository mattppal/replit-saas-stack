"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
    {
        name: "Jan",
        total: 2000,
    },
    {
        name: "Feb",
        total: 3000,
    },
    {
        name: "Mar",
        total: 4000,
    },
    {
        name: "Apr",
        total: 2800,
    },
    {
        name: "May",
        total: 1200,
    },
    {
        name: "Jun",
        total: 4800,
    },
    {
        name: "Jul",
        total: 4200,
    },
    {
        name: "Aug",
        total: 5800,
    },
    {
        name: "Sep",
        total: 4000,
    },
    {
        name: "Oct",
        total: 3800,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2800,
    },
]

const chartConfig = {
    total: {
        label: "Revenue",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export function OverviewChart() {
    return (
        <ChartContainer config={chartConfig} className="w-full">
            <BarChart data={data} className="h-[350px]">
                <CartesianGrid vertical={false} className="stroke-muted" />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                    dataKey="total"
                    fill="var(--color-total)"
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    )
} 