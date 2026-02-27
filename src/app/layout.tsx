import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { LandingNavbar } from "@/components/home/navbar";
import { LandingFooter } from "@/components/home/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/contexts/auth-context"
import { WishlistSync } from "@/components/wishlist-sync";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.dawly.store"),
  title: "DawlyStore",
  description:
    "A platform for buying and selling products online with a focus on quality and customer satisfaction",
  keywords: [
    "DawlyStore",
    "Buy Products",
    "Sell Products",
    "Online Shopping",
    "Quality Products",
    "Customer Satisfaction",
    "Multi-vendor marketplace",
  ],
  openGraph: {
    title: "DawlyStore",
    description:
      "A platform for buying and selling products online with a focus on quality and customer satisfaction",
    url: "https://www.dawly.store",
    type: "website",
    images: "/favicon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "DawlyStore",
    description:
      "A platform for buying and selling products online with a focus on quality and customer satisfaction",
    images: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <WishlistSync />
            <NuqsAdapter>
              <LandingNavbar />
              <main id="main-content">
                {children}
              </main>
              <LandingFooter />
            </NuqsAdapter>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
