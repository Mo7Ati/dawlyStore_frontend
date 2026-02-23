import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Store, Package, Truck, CreditCard, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Vendor Guide - DawlyStore',
  description:
    'Everything you need to succeed as a vendor on DawlyStore. Learn how to set up your store, list products, manage orders, and get paid.',
}

const guideSections = [
  {
    icon: Store,
    title: 'Getting started',
    description:
      'Apply to become a vendor from our Become a Vendor page. Once approved, you’ll get access to your Vendor Dashboard where you can set your store name, logo, and description. Complete your profile so buyers can find and trust your store.',
  },
  {
    icon: Package,
    title: 'Listing products',
    description:
      'Add products with clear titles, descriptions, and images. Set accurate categories and pricing. Use high-quality photos and honest descriptions to reduce returns and build good reviews. You can edit or unpublish listings anytime from the dashboard.',
  },
  {
    icon: Truck,
    title: 'Orders & shipping',
    description:
      'When an order comes in, you’ll see it in your dashboard. Ship within your stated handling time and upload tracking when available. Communicate with buyers if there are delays. Clear shipping policies help avoid disputes.',
  },
  {
    icon: CreditCard,
    title: 'Payouts & payments',
    description:
      'Earnings are tracked in your dashboard. Payouts are processed according to the platform’s schedule once orders are completed. Ensure your payout details are up to date so you receive payments on time.',
  },
  {
    icon: Lightbulb,
    title: 'Tips for success',
    description:
      'Respond to messages quickly, pack orders carefully, and keep your store policies clear. Good ratings and reviews help you attract more buyers. Consider promotions and competitive pricing when you’re ready to grow.',
  },
]

export default function VendorGuidePage() {
  return (
    <section className="from-background to-muted/50 relative isolate min-h-dvh w-full overflow-hidden bg-linear-to-br px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="bg-primary/10 text-primary mb-4 flex size-14 items-center justify-center rounded-full">
            <BookOpen className="size-8" />
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Vendor Guide
          </h1>
          <p className="text-muted-foreground max-w-md text-base sm:text-lg">
            Everything you need to succeed on DawlyStore — from opening your store to getting paid.
          </p>
        </div>

        <div className="space-y-6">
          {guideSections.map((section) => (
            <Card key={section.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <section.icon className="size-5" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button className="cursor-pointer" asChild>
            <Link href="/become-vendor">Become a vendor</Link>
          </Button>
          <Button variant="outline" className="cursor-pointer" asChild>
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
