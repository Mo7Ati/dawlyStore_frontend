import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, CircleHelp, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from './components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us - DawlyStore',
  description:
    'Get in touch with DawlyStore. Send a message, check our FAQ, or find us on GitHub.',
}

export default function ContactPage() {
  return (
    <section className="from-background to-muted/50 relative isolate min-h-dvh w-full overflow-hidden bg-linear-to-br px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-md text-base sm:text-lg">
            Need help or have questions? Our team is here to help. Send a message or check the options below.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact options */}
          <div className="space-y-6 order-2 lg:order-1">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Send a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  Use the form on this page to send us a message. We typically respond within 1–2 business days.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleHelp className="h-5 w-5 text-primary" />
                  FAQ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  Find answers to common questions about orders, shipping, returns, and selling on DawlyStore.
                </p>
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <Link href="/faq">View FAQ</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-primary" />
                  GitHub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  Report issues or contribute to the project on GitHub.
                </p>
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <a href="https://github.com/Mo7Ati" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
