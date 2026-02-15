'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/api'

const becomeVendorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

type BecomeVendorFormValues = z.infer<typeof becomeVendorSchema>

export function BecomeVendorForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ message: string, success: boolean } | null>(null)

  const form = useForm<BecomeVendorFormValues>({
    resolver: zodResolver(becomeVendorSchema),
    defaultValues: { name: '', email: '' },
  })

  async function onSubmit(data: BecomeVendorFormValues) {
    setIsLoading(true)

    try {
      const res = await api.post('/become-vendor', { name: data.name, email: data.email })
      setResult({ message: 'We Will contact you soon', success: true })
    } catch {
      setResult({ message: "Something went wrong. Please try again Later.", success: false })
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {result && result.success && (
        <p className="text-green-500 rounded-lg bg-green-500/10 px-3 py-2 text-sm">
          {result.message}
        </p>
      )}
      {result && !result.success && (
        <p className="text-destructive rounded-lg bg-destructive/10 px-3 py-2 text-sm">
          {result.message}
        </p>
      )}
      <div className="grid gap-4">
        <div className="space-y-2">
          <label
            htmlFor="become-vendor-name"
            className="text-muted-foreground text-sm font-medium"
          >
            Name
          </label>
          <Input
            id="become-vendor-name"
            placeholder="Your name"
            className="h-11 rounded-xl border-border/80 bg-muted/30 text-base placeholder:text-muted-foreground focus-visible:bg-background"
            autoComplete="name"
            disabled={isLoading}
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <p className="text-destructive text-xs">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="become-vendor-email"
            className="text-muted-foreground text-sm font-medium"
          >
            Email
          </label>
          <Input
            id="become-vendor-email"
            type="email"
            placeholder="you@example.com"
            className="h-11 rounded-xl border-border/80 bg-muted/30 text-base placeholder:text-muted-foreground focus-visible:bg-background"
            autoComplete="email"
            disabled={isLoading}
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-destructive text-xs">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-xl font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Get in touch'
        )}
      </Button>
    </form>
  )
}
