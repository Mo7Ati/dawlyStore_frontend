"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import CartCard from '../../cart-card'
import { CartIcon } from '@/app/cart/components/cart-icon'
import { NavbarUserDropdown } from './navbar-user-dropdown'
import { ModeToggle } from '@/components/toggle-theme'

type Customer = {
  name: string
  email: string
}

type NavbarDesktopActionsProps = {
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isLoading: boolean
  customer: Customer | null
  onLogout: () => void
}

export function NavbarDesktopActions({
  isCartOpen,
  setIsCartOpen,
  isLoading,
  customer,
  onLogout,
}: NavbarDesktopActionsProps) {
  console.log(isLoading, customer);
  return (
    <div className="hidden xl:flex items-center space-x-2">
      <ModeToggle />

      <div className="relative">
        <CartIcon className="cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)} />
        <CartCard isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      </div>

      <div>
        {isLoading ? (
          <Skeleton className="h-9 w-9 rounded-full" />
        ) : customer ? (
          <NavbarUserDropdown customer={customer} onLogout={onLogout} />
        ) : (
          <Button variant="ghost" asChild className="cursor-pointer">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
