"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import type { CategorySummaryItem } from "@/src/features/analysis/ai-analysis/types/analysis.types"

const SEGMENT_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#3b82f6",
] as const

type CategoryChartDatum = {
  category: string
  categoryKey: string
  amount: number
  share: number
  fill: string
  transaction_count: number
}

function buildChartConfig(categories: CategorySummaryItem[]): ChartConfig {
  const config: ChartConfig = {
    amount: {
      label: "Toplam",
    },
  }

  categories.forEach((item, index) => {
    const key = `cat-${index}`
    config[key] = {
      label: item.category,
      color: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
    }
  })

  return config
}

function buildChartData(categories: CategorySummaryItem[]): CategoryChartDatum[] {
  return categories.map((item, index) => ({
    category: item.category,
    categoryKey: `cat-${index}`,
    amount: item.total_amount,
    share: item.share_of_spend,
    fill: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
    transaction_count: item.transaction_count,
  }))
}

export default function CategoryCircleChart({
  categories,
}: {
  categories: CategorySummaryItem[]
}) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined,
  )

  const chartConfig = React.useMemo(
    () => buildChartConfig(categories),
    [categories],
  )
  const chartData = React.useMemo(
    () => buildChartData(categories),
    [categories],
  )
  const totalAmount = React.useMemo(
    () => categories.reduce((sum, item) => sum + item.total_amount, 0),
    [categories],
  )

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-linear-to-br from-background via-background to-muted/30 p-5 dark:border-white/10">
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Harcama Dağılımı
        </h3>
        <p className="text-xs text-muted-foreground">
          {categories.length} kategori
        </p>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Dilimler toplam harcama tutarına göre oranlanır.
      </p>

      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[300px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                nameKey="categoryKey"
                formatter={(value, _name, item) => {
                  const payload = item.payload as CategoryChartDatum
                  const amount =
                    typeof value === "number" ? value.toFixed(2) : String(value)

                  return (
                    <div className="flex w-full min-w-[180px] items-center justify-between gap-4">
                      <span className="font-medium">{payload.category}</span>
                      <span className="font-mono text-xs tabular-nums">
                        {amount} TRY · %{(payload.share * 100).toFixed(1)}
                      </span>
                    </div>
                  )
                }}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="categoryKey"
            innerRadius={68}
            outerRadius={100}
            paddingAngle={3}
            strokeWidth={0}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.categoryKey}
                fill={entry.fill}
                opacity={
                  activeIndex === undefined || activeIndex === index ? 1 : 0.45
                }
                className="outline-none transition-opacity duration-200"
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) - 6}
                        className="fill-muted-foreground text-[10px] font-medium uppercase tracking-wider"
                      >
                        Toplam
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 14}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {totalAmount.toLocaleString("tr-TR", {
                          maximumFractionDigits: 0,
                        })}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 34}
                        className="fill-muted-foreground text-xs"
                      >
                        TRY
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {chartData.map((item) => (
          <div
            key={item.categoryKey}
            className="flex items-center gap-2.5 rounded-xl border border-black/5 bg-background/80 px-3 py-2 dark:border-white/10"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-background"
              style={{ backgroundColor: item.fill }}
            />
            <span className="min-w-0 flex flex-1 truncate text-xs font-medium gap-3">
              <span>{item.category}</span>
              <span>{item.amount.toFixed(2)} TRY</span>
              <span>{item.transaction_count} işlem</span>
            </span>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
              %{(item.share * 100).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
