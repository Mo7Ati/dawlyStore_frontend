"use client"

import SectionsRenderer from './sections-renderer'
import { Section } from '@/types/home-types'


interface HomePageProps {
  sections: Section[]
}

export function HomePage({ sections }: HomePageProps) {
  
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <SectionsRenderer sections={sections} />
    </div>
  )
}
