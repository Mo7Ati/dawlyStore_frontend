"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/profile", label: "Basic information", icon: User },
  { href: "/profile/addresses", label: "Addresses", icon: MapPin },
  { href: "/profile/orders", label: "Previous orders", icon: ShoppingBag },
] as const;

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="from-background to-muted/50 relative isolate min-h-dvh w-full overflow-hidden bg-linear-to-br">
      <div className="relative z-10 container mx-auto flex min-h-dvh flex-col px-4 py-6 md:flex-row md:px-4 md:py-8">
        <aside className="w-full shrink-0 md:w-56 md:pr-8">
          <nav className="flex flex-col space-y-0.5 rounded-lg border bg-card p-2 shadow-sm md:sticky md:top-8">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === "/profile"
                  ? pathname === "/profile"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 pt-6 md:pt-0">{children}</main>
      </div>
    </div>
  );
}
