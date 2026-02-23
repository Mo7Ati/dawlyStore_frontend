import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - DawlyStore',
  description:
    'Read how DawlyStore collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <section className="from-background to-muted/50 relative isolate min-h-dvh w-full overflow-hidden bg-linear-to-br px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="bg-primary/10 text-primary mb-4 flex size-14 items-center justify-center rounded-full">
            <Shield className="size-8" />
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">Last updated: February 2025</p>
        </div>

        <Card>
          <CardHeader className="sr-only">
            <span>Privacy Policy</span>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none px-6 py-8 sm:px-8">
            <div className="privacy-policy-content [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-xl [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
              <p>
                At DawlyStore, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our marketplace.
              </p>

              <h2>Information we collect</h2>
              <p>
                We collect information you provide when you register, place orders, or contact us — such as your name, email address, shipping address, and payment details. We also collect usage data (e.g. how you use the site) to improve our services.
              </p>

              <h2>How we use your information</h2>
              <p>
                We use your information to process orders, communicate with you, improve our platform, and comply with legal obligations. We do not sell your personal information to third parties.
              </p>

              <h2>Sharing with vendors</h2>
              <p>
                When you buy from a vendor on DawlyStore, we share the information necessary to fulfill your order (e.g. name, shipping address, contact details) with that vendor. Vendors are required to use this information only for order fulfillment and to protect your privacy.
              </p>

              <h2>Security</h2>
              <p>
                We use industry-standard measures to protect your data. Payment information is processed securely. Please keep your account credentials safe and do not share them with others.
              </p>

              <h2>Your rights</h2>
              <p>
                You can access and update your account information in your profile. You may request deletion of your data or a copy of the data we hold about you, subject to applicable law.
              </p>

              <h2>Cookies</h2>
              <p>
                We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how our site is used. You can manage cookie settings in your browser.
              </p>

              <h2>Contact</h2>
              <p>
                If you have questions about this privacy policy or your data, please contact us through our <Link href="/contact" className="text-primary underline">Contact</Link> page.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="cursor-pointer" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
