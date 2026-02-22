'use client'

import Link from 'next/link'
import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type FaqItem = {
  value: string
  question: string
  answer: string
}

export function FaqContent({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="space-y-5">
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="rounded-md border! bg-transparent"
          >
            <AccordionTrigger className="cursor-pointer items-center gap-4 rounded-none bg-transparent py-2 ps-3 pe-4 hover:no-underline data-[state=open]:border-b">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                  <CircleHelp className="size-5" />
                </div>
                <span className="text-start font-semibold">{item.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-transparent">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          Still have questions? We&apos;re here to help.
        </p>
        <Button className="cursor-pointer" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
