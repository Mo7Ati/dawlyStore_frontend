import type { Metadata } from 'next'
import { getSections } from '@/services/sections-api'
import { HomePage } from '@/components/home/home-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: 'DawlyStore - Multi-Vendor E-Commerce Platform',
  description: 'A platform for buying and selling products online with a focus on quality and customer satisfaction',
  keywords: ['DawlyStore', 'Buy Products', 'Sell Products', 'Online Shopping', 'Quality Products', 'Customer Satisfaction'],
  openGraph: {
    title: 'DawlyStore - Multi-Vendor E-Commerce Platform',
    description: 'A platform for buying and selling products online with a focus on quality and customer satisfaction',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DawlyStore - Multi-Vendor E-Commerce Platform',
    description: 'A platform for buying and selling products online with a focus on quality and customer satisfaction',
  },
}

export default async function LandingPage() {
  const { data: sections } = await getSections()

  return (
    <HomePage sections={sections} />
  )
}
