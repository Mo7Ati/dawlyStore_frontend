import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { LandingNavbar } from "@/components/home/navbar";
import { LandingFooter } from "@/components/home/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/theme-provider"
import AuthProvider from "@/contexts/auth-context";


export const metadata: Metadata = {
  title: "Shadcn Dashboard",
  description: "A dashboard built with Next.js and shadcn/ui",
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
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
