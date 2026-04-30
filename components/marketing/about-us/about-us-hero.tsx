"use client"

import * as React from "react"
import { Cloud } from "lucide-react"
import { GlowCard } from "@/components/ui/glow-card"

const SPRINT_LENGTH_DAYS = 14

function getSprintMetrics(now: Date) {
  const dayPart = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
  }).format(now)
  const dayOfMonth = Number(dayPart)

  // Continuous 14-day sprint cycle
  const dayIndex = (dayOfMonth - 1) % SPRINT_LENGTH_DAYS
  const daysRemaining = Math.max(1, SPRINT_LENGTH_DAYS - dayIndex)

  // Logic: 
  // - Sprint begins (daysRemaining 14): Capacity full (2/3 engagements)
  // - Last 6 days (daysRemaining <= 6): Reduces to 1/3 engagements
  // - Ultimate value is 2/3, never 3/3
  const activeEngagements = daysRemaining > 6 ? 2 : 1

  // Progress bar is full at start of sprint and decreases as it progresses
  const bandwidthPercentage = (daysRemaining / SPRINT_LENGTH_DAYS) * 100

  return {
    daysRemaining,
    activeEngagements,
    bandwidthPercentage,
  }
}

export function AboutUsHero() {
  const [time, setTime] = React.useState("")
  const [days, setDays] = React.useState(14)
  const [activeEngagements, setActiveEngagements] = React.useState(2)
  const [bandwidthPercentage, setBandwidthPercentage] = React.useState(100)
  const [weather, setWeather] = React.useState({ temp: 29, humidity: 69 })

  React.useEffect(() => {
    // Dynamic Time in IST (Goa)
    const updateTime = () => {
      const now = new Date()
      const istTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
      setTime(istTime)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    // Real-time Weather Fetch (Goa: 15.49°N, 73.82°E)
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=15.49&longitude=73.82&current=temperature_2m,relative_humidity_2m&timezone=Asia%2FKolkata"
        )
        const data = await response.json()
        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m
          })
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error)
      }
    }

    fetchWeather()
    const weatherTimer = setInterval(fetchWeather, 600000) // Refresh every 10 mins

    const updateSprintMetrics = () => {
      const metrics = getSprintMetrics(new Date())
      setDays(metrics.daysRemaining)
      setActiveEngagements(metrics.activeEngagements)
      setBandwidthPercentage(metrics.bandwidthPercentage)
    }

    updateSprintMetrics()
    const sprintTimer = setInterval(updateSprintMetrics, 60 * 60 * 1000)

    return () => {
      clearInterval(timer)
      clearInterval(weatherTimer)
      clearInterval(sprintTimer)
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-background py-6 lg:py-14">
      <div className="mx-auto w-full px-6 lg:px-12 xl:px-[80px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-[#8e8e8e] uppercase mb-14">
          <span>Home</span>
          <span className="text-zinc-200">.</span>
          <span>About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-start gap-8 sm:gap-0">
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-8">
            <h1
              className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#252525] sm:text-6xl leading-[1.05]"
              style={{ fontFamily: 'var(--font-heading, serif)' }}
            >
              We Don&apos;t Just Design Screens.<br />
              <span>We Engineer Clarity</span>
            </h1>

            <div className="max-w-[580px] space-y-8">
              <p className="text-[16px] lg:text-[20px] leading-relaxed text-[#252525] font-medium">
                Stickman.Design is an independent design practice specialising in SaaS retention and decision architecture. No account managers. No bloated timelines. Over a decade of specialised UX experience applied directly to your most complex product problems.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Status Cards - Now side-by-side as requested, including mobile */}
          <div className="grid grid-cols-2 gap-5 sm:gap-6 items-stretch lg:pl-4 xl:pl-0">
            {/* Card 1: Headquarters */}
            <GlowCard
              radius={12}
              className="rounded-[22px] border border-[#E0E0E0] bg-zinc-100/50 p-[1.5px] transition-all duration-300 h-full sm:min-h-[150px]"
              innerClassName="bg-background p-4 xl:p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full"
            >
              <div className="space-y-3 sm:space-y-4">
                <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.3em] text-[#8e8e8e] uppercase">
                  Headquarters
                </p>
                <div className="space-y-1">
                  <p className="text-[14px] sm:text-[16px] font-bold text-[#252525]">Goa, India</p>
                  <p className="text-2xl sm:text-4xl font-bold text-[#252525] tabular-nums tracking-tighter">
                    {time || "00:00:00"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#252525] font-medium text-[12px] sm:text-[13px] pt-4">
                <Cloud className="size-4 text-[#8e8e8e]" />
                <span>{weather.temp}°C / Humidity: {weather.humidity}%</span>
              </div>
            </GlowCard>

            {/* Card 2: Work Bandwidth */}
            <GlowCard
              radius={12}
              className="rounded-[22px] border border-[#E0E0E0] bg-zinc-100/50 p-[1.5px] transition-all duration-300 h-full"
              innerClassName="bg-background p-4 xl:p-6 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full"
            >
              <div className="space-y-4 sm:space-y-6">
                <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.3em] text-[#8e8e8e] uppercase">
                  Work Bandwidth
                </p>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[14px] sm:text-[16px] font-bold text-[#252525]">Consumed Capacity</p>
                    <p className="text-2xl sm:text-4xl font-bold text-[#252525]">
                      {bandwidthPercentage.toFixed(2)}%
                    </p>
                  </div>
                  {/* Custom Styled Progress Bar */}
                  <div className="w-full">
                    <div className="h-3 sm:h-4 w-full bg-[#EDEDED] overflow-hidden" style={{ borderRadius: '12px' }}>
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${bandwidthPercentage}%`,
                          borderRadius: '12px',
                          background: 'linear-gradient(90deg, #3775E9 0%, #87B1FF 100%)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 pt-4 sm:pt-6 border-t border-zinc-50 text-[11px] sm:text-[12px] font-medium text-[#252525]">
                <div className="flex items-center justify-between">
                  <span>Active Engagements:</span>
                  <span className="text-[#252525] font-bold">{activeEngagements} / 3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next Sprint:</span>
                  <span className="text-[#252525] font-bold">{days} days</span>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  )
}

