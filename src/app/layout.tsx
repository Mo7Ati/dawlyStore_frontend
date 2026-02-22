import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { LandingNavbar } from "@/components/home/navbar";
import { LandingFooter } from "@/components/home/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/contexts/auth-context";


export const metadata: Metadata = {
  title: "DawlyStore",
  description: "A platform for buying and selling products online with a focus on quality and customer satisfaction",
  keywords: ["DawlyStore", "Buy Products", "Sell Products", "Online Shopping", "Quality Products", "Customer Satisfaction"],
  openGraph: {
    title: "DawlyStore",
    description: "A platform for buying and selling products online with a focus on quality and customer satisfaction",
    images: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "DawlyStore",
    description: "A platform for buying and selling products online with a focus on quality and customer satisfaction",
    images: "/logo.png",
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
            <NuqsAdapter>
              <LandingNavbar />
              {children}
              <LandingFooter />
            </NuqsAdapter>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
