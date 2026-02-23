"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import CartCard from '../../cart-card'
import { CartIcon } from '@/app/cart/components/cart-icon'
import { WishlistIcon } from '@/components/wishlist-icon'
import { WishlistDropdown } from '@/components/wishlist-dropdown'
import { NavbarUserDropdown } from './navbar-user-dropdown'
import { ModeToggle } from '@/components/toggle-theme'

type Customer = {
  name: string
  email: string
}

type NavbarDesktopActionsProps = {
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isWishlistOpen: boolean
  setIsWishlistOpen: (open: boolean) => void
  isLoading: boolean
  customer: Customer | null
  onLogout: () => void
}

export function NavbarDesktopActions({
  isCartOpen,
  setIsCartOpen,
  isWishlistOpen,
  setIsWishlistOpen,
  isLoading,
  customer,
  onLogout,
}: NavbarDesktopActionsProps) {
  return (
    <div className="hidden xl:flex items-center space-x-2">
      <ModeToggle />

      <div className="relative">
        <WishlistIcon className="cursor-pointer" onClick={() => { setIsWishlistOpen(!isWishlistOpen); setIsCartOpen(false); }} />
        <WishlistDropdown isOpen={isWishlistOpen} setIsOpen={setIsWishlistOpen} />
      </div>

      <div className="relative">
        <CartIcon className="cursor-pointer" onClick={() => { setIsCartOpen(!isCartOpen); setIsWishlistOpen(false); }} />
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
