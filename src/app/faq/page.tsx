import type { Metadata } from 'next'
import { FaqContent } from './components/faq-content'

export const metadata: Metadata = {
  title: 'FAQ - DawlyStore',
  description:
    'Frequently asked questions about orders, shipping, returns, becoming a vendor, and more on DawlyStore.',
}

const faqItems = [
  {
    value: 'item-1',
    question: 'How do I track my order?',
    answer:
      'After your order is placed, you will receive a confirmation email with a tracking link. You can also track your order anytime by signing in and visiting your profile under Orders. Vendors typically ship within 1–3 business days.',
  },
  {
    value: 'item-2',
    question: 'What are the shipping options and delivery times?',
    answer:
      'Shipping options and delivery times vary by vendor and product. At checkout you will see the available methods (e.g. standard, express) and estimated delivery. Most orders within the same region arrive within 5–10 business days for standard shipping.',
  },
  {
    value: 'item-3',
    question: 'How do returns and refunds work?',
    answer:
      'Each vendor sets their own return policy, which is shown on the product page. Generally, you can request a return within the stated window (e.g. 14–30 days) for unused items. Refunds are processed to your original payment method once the return is received and approved.',
  },
  {
    value: 'item-4',
    question: 'How do I become a vendor on DawlyStore?',
    answer:
      'Visit our Become a Vendor page and submit the form with your name and email. Our team will review your request and get in touch with next steps, including account setup and guidelines for listing and selling on the platform.',
  },
  {
    value: 'item-5',
    question: 'How do I manage my account and addresses?',
    answer:
      'Sign in and go to your profile to update your details, change your password, and manage saved addresses. You can add, edit, or remove addresses so checkout is quick and accurate.',
  },
  {
    value: 'item-6',
    question: 'What payment methods are accepted?',
    answer:
      'We accept major credit and debit cards and other payment methods configured by the platform. Payment is processed securely at checkout. If a payment fails, ensure your details are correct and try again or use another method.',
  },
]

export default function FaqPage() {
  return (
    <section className="from-background to-muted/50 relative isolate min-h-dvh w-full overflow-hidden bg-linear-to-br px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-md text-base sm:text-lg">
            Everything you need to know about orders, shipping, returns, and selling on DawlyStore.
          </p>
        </div>
        <FaqContent items={faqItems} />
      </div>
    </section>
  )
}
