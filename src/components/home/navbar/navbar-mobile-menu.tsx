"use client"

import { Menu, LogOut, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Logo } from '@/components/logo'

import { MobileMegaMenu } from '../mobile-mega-menu'
import { navigationItems, smoothScrollTo, getUserInitials } from './nav-config'
import { ModeToggle } from '@/components/toggle-theme'
import { CartIcon } from '@/app/cart/components/cart-icon'

type Customer = {
  name: string
  email: string
}

type NavbarMobileMenuProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isLoading: boolean
  customer: Customer | null
  onLogout: () => void
}

export function NavbarMobileMenu({
  isOpen,
  setIsOpen,
  isLoading,
  customer,
  onLogout,
}: NavbarMobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="xl:hidden">
        <Button variant="ghost" size="icon" className="cursor-pointer" aria-label="Open menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 gap-0 [&>button]:hidden overflow-hidden flex flex-col">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="space-y-0 p-4 pb-2 border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Logo size={16} />
              </div>
              <SheetTitle className="text-lg font-semibold">ShadcnStore</SheetTitle>
              <div className="ml-auto flex items-center gap-2">
                <span onClick={() => setIsOpen(false)}>
                  <CartIcon asLink href="/cart" className="h-8 w-8" />
                </span>
                <ModeToggle />

                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="cursor-pointer h-8 w-8" aria-label="Close menu">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-1" aria-label="Mobile navigation">
              {/* Static Navigation Items */}
              {navigationItems.filter(item => !item.hasMegaMenu).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={(e) => {
                    setIsOpen(false)
                    if (item.href.startsWith('#')) {
                      e.preventDefault()
                      setTimeout(() => smoothScrollTo(item.href), 100)
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}

              {/* Marketplace Mega Menu (Accordion Style) */}
              <div className="pt-4 border-t mt-4">
                <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Marketplace
                </h3>
                <MobileMegaMenu onItemClick={() => setIsOpen(false)} />
              </div>
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="border-t p-6 space-y-4">
            {isLoading ? (
              // Skeleton while checking auth state
              <div className="space-y-3">
                <Skeleton className="h-11 w-full rounded-md" />
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-11 w-full rounded-md" />
                  <Skeleton className="h-11 w-full rounded-md" />
                </div>
              </div>
            ) : customer ? (
              // Authenticated User Actions
              <div className="space-y-3">
                {/* User Info - link to profile */}
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {getUserInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{customer.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                  </div>
                </Link>

                {/* Action Buttons */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full cursor-pointer text-destructive hover:text-destructive"
                  onClick={() => {
                    setIsOpen(false)
                    onLogout()
                  }}
                >
                  <LogOut className="size-4" />
                  Log out
                </Button>
              </div>
            ) : (
              // Guest Actions
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg" asChild className="cursor-pointer">
                    <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild size="lg" className="cursor-pointer">
                    <Link href="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
