"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DotPattern } from '@/components/dot-pattern'
import { HeroSectionData } from '@/types/home-types'

export function HeroSection({ data }: { data: HeroSectionData }) {
  const { title, description } = data
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden bg-gradient-to-b from-background to-background/80 py-16 sm:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Dot pattern overlay using reusable component */}
        <DotPattern className="opacity-100" size="md" fadeStyle="ellipse" />
      </div>

      <div className="container relative mx-auto flex flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base cursor-pointer" asChild>
              <Link href="/stores">
                Browse Stores
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base cursor-pointer" asChild>
              <Link href="become-vendor">
                <Play className="mr-2 h-4 w-4" />
                Join as a Vendor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}