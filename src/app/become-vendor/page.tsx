import type { Metadata } from "next";
import { BecomeVendorForm } from "./components/become-vendor-form";

export const metadata: Metadata = {
  title: "Become a Vendor - DawlyStore",
  description:
    "Apply to become a vendor on DawlyStore and start selling your products in our multi-vendor online marketplace.",
};

export default function BecomeVendorPage() {
  return (
    <section className="relative isolate min-h-dvh w-full overflow-hidden bg-linear-to-br from-background via-background to-muted/60 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      {/* Background: soft grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:opacity-[0.25] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-start gap-10 lg:grid-cols-2">
        {/* Left: Copy / value props */}
        <div className="pt-2">
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Become a Vendor on <span className="text-primary">DawlyStore</span>
          </h1>

          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Share your store details and we&apos;ll review your application. Once approved,
            you&apos;ll get access to your vendor dashboard to manage products, orders, and payouts.
          </p>

          {/* Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Feature
              title="Easy onboarding"
              desc="Submit your details and get started with a guided setup."
            />
            <Feature
              title="Sell at scale"
              desc="Reach more customers through our marketplace discovery."
            />
            <Feature
              title="Manage everything"
              desc="Products, inventory, orders, and delivery in one place."
            />
            <Feature
              title="Secure payments"
              desc="Reliable checkout and clear settlement tracking."
            />
          </div>
        </div>

        {/* Right: Form card */}
        <div className="lg:pt-2">
          <div className="relative rounded-2xl border bg-background/70 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Vendor Application
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us about your business. We’ll contact you soon.
              </p>
            </div>

            <BecomeVendorForm />

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              By submitting, you agree to be contacted by DawlyStore regarding your application.
            </p>

            {/* subtle corner glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-background/60 p-4 backdrop-blur">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}