import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { LandingNavbar } from "@/components/home/navbar";
import { LandingFooter } from "@/components/home/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>
        <LandingNavbar />
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
        <LandingFooter />
      </body>
    </html>
  );
}
