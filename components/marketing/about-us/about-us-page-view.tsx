"use client"

import * as React from "react"
import { ContactSection } from "@/components/marketing/home/contact-section"
import { AboutUsHero } from "@/components/marketing/about-us/about-us-hero"
import { PhilosophySection } from "@/components/marketing/about-us/philosophy-section"
import { FounderSection } from "@/components/marketing/about-us/founder-section"

export function AboutUsPageView() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-black/5 selection:text-black">
      {/* Hero Section */}
      <div>
        <AboutUsHero />
      </div>

      {/* Philosophy Section */}
      <div className="-mt-6">
        <PhilosophySection />
      </div>

      {/* Founder Section */}
      <div className="-mt-10 lg:-mt-28">
        <FounderSection />
      </div>

      {/* Contact Support Section */}
      <div className="-mt-14 lg:-mt-22">
        <ContactSection />
      </div>
    </main>
  )
}
