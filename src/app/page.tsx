import type { Metadata } from 'next'
import { getSections } from '@/services/sections-api'
import { HomePage } from '@/components/home/home-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: 'ShadcnStore - Modern Admin Dashboard Template',
  description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui. Perfect for building modern web applications.',
  keywords: ['admin dashboard', 'react', 'nextjs', 'typescript', 'shadcn/ui', 'tailwind css'],
  openGraph: {
    title: 'ShadcnStore - Modern Admin Dashboard Template',
    description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShadcnStore - Modern Admin Dashboard Template',
    description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui.',
  },
}

export default async function LandingPage() {
  let sections: Awaited<ReturnType<typeof getSections>>['data'] = []
  try {
    const result = await getSections()
    sections = result?.data ?? []
  } catch {
    // During build or when backend is unavailable, render with empty sections
  }

  return (
    <HomePage sections={sections} />
  )
}
