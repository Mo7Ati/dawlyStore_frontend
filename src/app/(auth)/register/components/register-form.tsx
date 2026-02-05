'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Mail, Lock, User, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'

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
const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    password_confirmation: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  })

type RegisterFormValues = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { register } = useAuth()

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  // Handle form submission
  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
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

        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="text"
                    placeholder="Full Name"
                    className="bg-transparent ps-10"
                    autoComplete="name"
                    disabled={isLoading}
                  />
                  <User className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="bg-transparent ps-10"
                    autoComplete="new-password"
                    disabled={isLoading}
                  />
                  <Lock className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute end-0 top-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeIcon className="text-muted-foreground size-4" />
                    ) : (
                      <EyeOffIcon className="text-muted-foreground size-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="bg-transparent ps-10"
                    autoComplete="new-password"
                    disabled={isLoading}
                  />
                  <Lock className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute end-0 top-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeIcon className="text-muted-foreground size-4" />
                    ) : (
                      <EyeOffIcon className="text-muted-foreground size-4" />
                    )}
                  </Button>
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
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      {/* Sign In Link */}
      <p className="mt-6 space-x-1 text-center text-sm">
        <span>Already have an account?</span>
        <Link href="/login" className="underline underline-offset-4">
          Sign In
        </Link>
      </p>
    </Form>
  )
}
