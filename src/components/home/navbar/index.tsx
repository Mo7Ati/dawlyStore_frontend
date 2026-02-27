"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { useAuth } from "@/contexts/auth-context"
import { NavbarDesktopNav } from "./navbar-desktop-nav"
import { NavbarDesktopActions } from "./navbar-desktop-actions"
import { NavbarMobileMenu } from "./navbar-mobile-menu"

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const { customer, logout, isCustomerLoading: isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* cosmic spacing */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        {/* pill container */}
        <div className="rounded-2xl border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Brand */}
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center space-x-2 cursor-pointer"
                rel="noopener noreferrer"
              >
                <Logo size={32} />
                <span className="font-bold">DawlyStore</span>
              </Link>
            </div>

            {/* Desktop Nav (center) */}
            <NavbarDesktopNav />

            {/* Desktop Actions (right) */}
            <NavbarDesktopActions
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              isWishlistOpen={isWishlistOpen}
              setIsWishlistOpen={setIsWishlistOpen}
              isLoading={isLoading}
              customer={customer}
              onLogout={logout}
            />

            {/* Mobile Menu */}
            <NavbarMobileMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isLoading={isLoading}
              customer={customer}
              onLogout={logout}
            />
          </div>
        </div>
      </div>
    </header>
  )
}