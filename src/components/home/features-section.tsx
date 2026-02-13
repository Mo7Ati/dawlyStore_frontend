"use client"

import {
  BarChart3,
  Zap,
  Users,
  ArrowRight,
  Database,
  Package,
  Crown,
  Layout,
  Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image3D } from '@/components/image-3d'
import { FeaturesSectionData } from '@/types/home-types'
import { checkAuth } from '@/services/auth/auth-service'
import { getStoreCategories, getStores } from '@/services/stores/store-service'
import Link from 'next/link'

const secondaryFeatures = [
  {
    icon: BarChart3,
    title: 'Multiple Frameworks',
    description: 'React, Next.js, and Vite compatibility for flexible development.'
  },
  {
    icon: Palette,
    title: 'Modern Tech Stack',
    description: 'Built with shadcn/ui, Tailwind CSS, and TypeScript.'
  },
  {
    icon: Users,
    title: 'Responsive Design',
    description: 'Mobile-first components for all screen sizes and devices.'
  },
  {
    icon: Database,
    title: 'Developer-Friendly',
    description: 'Clean code, well-documented, easy integration and customization.'
  }
]

export function FeaturesSection({ features }: { features: FeaturesSectionData[] }) {

  return (
    <section id="features" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">Powerful Marketplace Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to buy the products you want
          </h2>
          <p className="text-lg text-muted-foreground">
            Our marketplace provides trusted stores with verified products to help you buy the products you want faster than ever.
          </p>
        </div>

        {/* First Feature Section */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">
          {/* Left Image */}
          <Image3D
            lightSrc="/feature-1-light.png"
            darkSrc="/feature-1-dark.png"
            alt="Analytics dashboard"
            direction="left"
          />
          {/* Right Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                A complete store management system
              </h3>
              <p className="text-muted-foreground text-base text-pretty">
                Our platform gives you all the tools to launch, scale, and succeed. From multi-vendor management to secure payments and seamless checkout,
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <li key={index} className="group hover:bg-accent/5 flex items-start gap-3 p-2 rounded-lg transition-colors">
                  <div>
                    <h3 className="text-foreground font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pe-4 pt-2">
              <Button size="lg" className="cursor-pointer">
                <Link href="/stores" className='flex items-center'>
                  Browse Stores
                  <ArrowRight className="ms-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer">
                <Link href="/become-vendor" className='flex items-center'>
                  Start Selling
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
