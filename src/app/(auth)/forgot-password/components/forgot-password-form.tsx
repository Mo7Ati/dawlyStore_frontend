'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Mail, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useAuth } from '@/contexts/auth-context'

// Define the form schema with Zod
const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { forgotPassword } = useAuth()

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  // Handle form submission
  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await forgotPassword(data.email)
      // If no error was set, show success message
      if (!errorMessage) {
        setSuccessMessage('If an account exists with this email, you will receive a password reset link.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Message */}
        {errorMessage && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="rounded-md bg-green-500/15 p-3 text-sm text-green-600 dark:text-green-400">
            {successMessage}
          </div>
        )}

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="email"
                    placeholder="me@example.com"
                    className="bg-transparent ps-10"
                    autoComplete="email"
                    disabled={isLoading}
                  />
                  <Mail className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full cursor-pointer" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Reset Code'
          )}
        </Button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-6 space-x-1 text-center text-sm">
        <span>Don&apos;t have an account yet?</span>
        <Link href="/register" className="underline underline-offset-4">
          Sign Up
        </Link>
      </p>
    </Form>
  )
}

export default ForgotPasswordForm
