"use client"

import React from 'react'
import { LandingNavbar } from "@/app/(home)/components/navbar"
import { LandingThemeCustomizer, LandingThemeCustomizerTrigger } from "@/app/(home)/components/landing-theme-customizer"
import SectionsRenderer from './sections-renderer'
import { Section } from '@/types/home-types'
import { LandingFooter } from '@/app/(home)/components/footer'

interface HomePageProps {
  sections: Section[]
}

export function HomePage({ sections }: HomePageProps) {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <LandingNavbar />

      {/* Main Content */}
      <main>
        <SectionsRenderer sections={sections} />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Theme Customizer */}
      <LandingThemeCustomizerTrigger onClick={() => setThemeCustomizerOpen(true)} />
      <LandingThemeCustomizer open={themeCustomizerOpen} onOpenChange={setThemeCustomizerOpen} />
    </div>
  )
}
