"use client"

import { TrendingUp, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CTASectionData } from '@/types/home-types'
import Link from 'next/link'

export function CTASection({ data }: { data: CTASectionData }) {
  return (
    <section className='py-16 lg:py-24 bg-muted/80'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='text-center'>
            <div className='space-y-8'>
              {/* Badge and Stats */}
              <div className='flex flex-col items-center gap-4'>
                <Badge variant='outline' className='flex items-center gap-2'>
                  <TrendingUp className='size-3' />
                  Productivity Suite
                </Badge>

                <div className='text-muted-foreground flex items-center gap-4 text-sm'>
                  <span className='flex items-center gap-1'>
                    <div className='size-2 rounded-full bg-green-500' />
                    500+ Vendors
                  </span>
                  <Separator orientation='vertical' className='!h-4' />
                  <span>25K+ Products</span>
                  <Separator orientation='vertical' className='!h-4' />
                  <span>4.9★ Average Rating</span>
                </div>
              </div>

              {/* Main Content */}
              <div className='space-y-6'>
                {/* <h1 className='text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
                  Supercharge your team&apos;s
                  <span className='flex sm:inline-flex justify-center'>
                    <span className='relative mx-2'>
                      <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                        performance
                      </span>
                      <div className='absolute start-0 -bottom-2 h-1 w-full bg-gradient-to-r from-primary/30 to-secondary/30' />
                    </span>
                    today
                  </span>
                </h1> */}
                <h1 className='text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
                  {data.title}
                </h1>

                <p className='text-muted-foreground mx-auto max-w-2xl text-balance lg:text-xl'>
                  {data.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className='flex flex-col justify-center gap-4 sm:flex-row sm:gap-6'>
                <Button size='lg' className='cursor-pointer px-8 py-6 text-lg font-medium' asChild>
                  <Link href='/vendor/register'>
                    <Handshake className='me-2 size-5' />
                    Become A Vendor
                  </Link>
                </Button>
                {/* <Button variant='outline' size='lg' className='cursor-pointer px-8 py-6 text-lg font-medium group' asChild>
                  <a href='https://github.com/silicondeck/shadcn-dashboard-landing-template' target='_blank' rel='noopener noreferrer'>
                    <Github className='me-2 size-5' />
                    View on GitHub
                    <ArrowRight className='ms-2 size-4 transition-transform group-hover:translate-x-1' />
                  </a>
                </Button> */}
              </div>

              {/* Trust Indicators */}
              <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm'>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full bg-green-600 dark:bg-green-400 me-1' />

                  <span>Verified vendors only</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full bg-blue-600 dark:bg-blue-400 me-1' />

                  <span>100% Genuine Products</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full bg-purple-600 dark:bg-purple-400 me-1' />

                  <span>Fast delivery & support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
