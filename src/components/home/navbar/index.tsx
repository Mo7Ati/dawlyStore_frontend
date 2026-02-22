"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { useAuth } from '@/contexts/auth-context'
import { NavbarDesktopNav } from './navbar-desktop-nav'
import { NavbarDesktopActions } from './navbar-desktop-actions'
import { NavbarMobileMenu } from './navbar-mobile-menu'

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { customer, logout, isCustomerLoading: isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
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

        <NavbarDesktopNav />
        
        <NavbarDesktopActions
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isLoading={isLoading}
          customer={customer}
          onLogout={logout}
        />

        <NavbarMobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
          customer={customer}
          onLogout={logout}
        />
      </div>
    </header>
  )
}
