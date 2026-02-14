import { Card } from '@/components/ui/card'
import { LoginForm } from './components/login-form'
import { Logo } from '@/components/logo'

export default function LoginPage() {
  return (
    <section className="from-background to-muted/50 relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden bg-linear-to-br">
      <div className="relative z-10 container mx-auto flex min-h-dvh items-center justify-center px-4">
        <Card className="relative w-full max-w-md border-none p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <div className="my-4 flex justify-center">
              <div className="bg-secondary relative size-14 rounded-full border">
                <div className="flex h-full items-center justify-center">
                  <Logo />
                </div>
              </div>
            </div>
            <h1 className="mb-2 text-center text-2xl font-bold tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              Sign in to continue your journey
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />
        </Card>
      </div>
    </section>
  )
}
