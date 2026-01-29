"use client"

import React from 'react'
import SectionsRenderer from './sections-renderer'
import { Section } from '@/types/home-types'
import { LandingNavbar } from './navbar'
import { LandingFooter } from './footer'
import { LandingThemeCustomizer, LandingThemeCustomizerTrigger } from './landing-theme-customizer'

interface HomePageProps {
  sections: Section[]
}

export function HomePage({ sections }: HomePageProps) {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <SectionsRenderer sections={sections} />

      {/* Theme Customizer */}
      <LandingThemeCustomizerTrigger onClick={() => setThemeCustomizerOpen(true)} />
      <LandingThemeCustomizer open={themeCustomizerOpen} onOpenChange={setThemeCustomizerOpen} />
    </div>
  )
}
