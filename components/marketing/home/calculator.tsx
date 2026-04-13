"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Calculator() {
  const [users, setUsers] = React.useState<readonly number[] | number>([10000])
  const [crc, setCrc] = React.useState<readonly number[] | number>([120])
  const [dropoff, setDropoff] = React.useState<readonly number[] | number>([30])

  // Helper to ensure we always have a single number for calculations
  const getVal = (v: readonly number[] | number) => {
    if (Array.isArray(v)) return v[0] ?? 0
    return v ?? 0
  }

  const usersVal = getVal(users)
  const crcVal = getVal(crc)
  const dropoffVal = getVal(dropoff)

  const annualLoss = (usersVal * (dropoffVal / 100)) * crcVal * 12
  const chartMax = React.useMemo(() => {
    const rawMax = Math.max(annualLoss, 1000)
    const magnitude = 10 ** Math.floor(Math.log10(rawMax))
    const normalized = rawMax / magnitude

    if (normalized <= 1) return 1 * magnitude
    if (normalized <= 2) return 2 * magnitude
    if (normalized <= 5) return 5 * magnitude
    return 10 * magnitude
  }, [annualLoss])

  const data = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1
      const progress = month / 12
      return {
        month,
        loss: annualLoss * Math.pow(progress, 1.18),
      }
    })
  }, [annualLoss])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatAxisCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }

    if (value >= 1000) {
      return `$${Math.round(value / 1000)}k`
    }

    return `$${Math.round(value)}`
  }

  return (
    <Card className="h-[470px] w-full max-w-[400px] overflow-visible rounded-2xl border-none bg-background shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.15)]">
      <CardContent className="flex h-full flex-col px-8 py-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 font-bold uppercase">
              Cost of Confusion
            </p>
            <h3 className="text-sm font-medium text-zinc-500">
              Est. Annual Revenue Lost
            </h3>
            <div className="text-4xl font-mono tracking-tighter font-bold text-zinc-900">
              {formatCurrency(annualLoss)}
            </div>
          </div>
          <TooltipProvider delay={0}>
            <Tooltip>
              <TooltipTrigger>
                <div className="p-1 rounded-full cursor-help hover:bg-zinc-50 transition-colors">
                  <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 text-[10px] font-bold">i</div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="max-w-[240px] p-4 bg-[#333] text-zinc-100 border-none rounded-xl text-xs leading-relaxed shadow-2xl"
              >
                <p>
                  This reveals the annual revenue lost to interface friction. Good UX isn&apos;t just an aesthetic choice, it&apos;s the recovery of lost capital.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Graph Section */}
        <div className="relative -mx-4 mt-5 h-[128px] w-full font-sans">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 6, right: 24, left: 6, bottom: 10 }}>
              <defs>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000" stopOpacity={0.05} />
                  <stop offset="95%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis
                type="number"
                domain={[0, chartMax]}
                tickCount={3}
                interval={0}
                axisLine={false}
                tickLine={false}
                width={52}
                tick={{ fontSize: 10, fill: '#aaa', fontWeight: 500 }}
                tickFormatter={formatAxisCurrency}
                ticks={[0, chartMax / 2, chartMax]}
              />
              <Area
                type="monotone"
                dataKey="loss"
                stroke="#ccc"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorLoss)"
                isAnimationActive={false}
              />
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-zinc-900 text-white border-none p-2 rounded-lg shadow-xl text-[10px] font-mono">
                        {formatCurrency(payload[0].value as number)}
                      </div>
                    )
                  }
                  return null
                }}
                wrapperStyle={{ outline: 'none' }}
                cursor={{ stroke: '#000', strokeWidth: 0.5, strokeDasharray: '4 4' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-auto space-y-4 pt-6">
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-500">Monthly Users:</span>
              <span className="font-mono text-zinc-900">{usersVal.toLocaleString()}</span>
            </div>
            <Slider
              value={users}
              onValueChange={setUsers}
              min={100}
              max={500000}
              step={100}
              className="py-2"
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-500">Avg. Retention Cost:</span>
              <span className="font-mono text-zinc-900">${crcVal}</span>
            </div>
            <Slider
              value={crc}
              onValueChange={setCrc}
              min={5}
              max={1000}
              step={5}
              className="py-2"
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-500">Drop-off Rate:</span>
              <span className="font-mono text-zinc-900">{dropoffVal}%</span>
            </div>
            <Slider
              value={dropoff}
              onValueChange={setDropoff}
              min={0}
              max={100}
              step={1}
              className="py-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

