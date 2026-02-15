import { BecomeVendorForm } from './components/become-vendor-form'

export default function BecomeVendorPage() {
  return (
    <section className="from-background to-muted/50 relative isolate min-h-dvh w-full overflow-hidden bg-linear-to-br px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Become a Vendor
          </h1>
          <p className="text-muted-foreground max-w-md text-base sm:text-lg">
            Tell us about yourself and we&apos;ll get in touch.
          </p>
        </div>
        <BecomeVendorForm />
      </div>
    </section>
  )
}
