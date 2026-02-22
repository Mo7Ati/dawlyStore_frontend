import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - DawlyStore",
  description: "Sign in to your account or create a new one",
  keywords: ["Dawly Store", "Authentication", "Sign in", "Create Account"],
  openGraph: {
    title: "Authentication - Dawly Store",
    description: "Sign in to your account or create a new one",
    images: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Authentication - Dawly Store",
    description: "Sign in to your account or create a new one",
    images: "/logo.png",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
