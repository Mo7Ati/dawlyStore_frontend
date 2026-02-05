"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Github, LayoutDashboard, X, Moon, Sun, User, LogOut, Settings, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Logo } from '@/components/logo'
import { useAuth } from '@/contexts/auth-context'
import { MegaMenu } from './mega-menu'
import { MobileMegaMenu } from './mobile-mega-menu'
import CartCard from '../cart-card'
import { CartIcon } from '@/app/cart/components/cart-icon'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '../toggle-theme'

// ============================================================================
// Navigation Configuration
// ============================================================================

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Marketplace', href: '/marketplace', hasMegaMenu: true },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Smooth scroll to a target element by ID
 */
const smoothScrollTo = (targetId: string) => {
  if (targetId.startsWith('#')) {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
}

// ============================================================================
// Main Navbar Component
// ============================================================================

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { customer, logout } = useAuth()
  const router = useRouter()

  // Auth loading state: user is undefined while SWR is fetching
  // Once fetched, user will be either the Customer object or null (if not authenticated)
  // const isAuthLoading = user === undefined

  /**
   * Handle closing the mobile menu when an item is clicked
   */
  const handleMobileItemClick = () => {
    setIsOpen(false)
  }

  /**
   * Get user initials for avatar fallback
   */
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="https://shadcnstore.com" className="flex items-center space-x-2 cursor-pointer" target='_blank' rel="noopener noreferrer">
            <Logo size={32} />
            <span className="font-bold">
              ShadcnStore
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.hasMegaMenu ? (
                  <>
                    <NavigationMenuTrigger
                      className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary cursor-pointer"
                      aria-label={`${item.name} menu`}
                    >
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <MegaMenu />
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none cursor-pointer"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      if (item.href.startsWith('#')) {
                        smoothScrollTo(item.href)
                      } else {
                        router.push(item.href)
                      }
                    }}
                  >
                    {item.name}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center space-x-2">
          <ModeToggle />

          <div className="relative">
            <CartIcon className='cursor-pointer' onClick={() => setIsCartOpen(!isCartOpen)} />
            <CartCard isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
          </div>

          {/* Auth State: Loading / Authenticated / Not Authenticated */}
          {/* <div>
            {isLoading ? (
              // Skeleton while checking auth state
              <Skeleton className="h-9 w-9 rounded-full" />
            ) : user ? (
              // User Profile Dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Sign In Button
              <Button variant="ghost" asChild className="cursor-pointer">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div> */}
        </div>

        {/* Mobile Menu */}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      // onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      className="cursor-pointer h-8 w-8"
                      aria-label="Toggle theme"
                    >
                      <Moon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="cursor-pointer h-8 w-8">
                      <a href="https://github.com/silicondeck/shadcn-dashboard-landing-template" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
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
                    <MobileMegaMenu onItemClick={handleMobileItemClick} />
                  </div>
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="border-t p-6 space-y-4">
                {false ? ( // TODO: Change to customer
                  // Skeleton while checking auth state
                  <div className="space-y-3">
                    <Skeleton className="h-11 w-full rounded-md" />
                    <div className="grid grid-cols-2 gap-3">
                      <Skeleton className="h-11 w-full rounded-md" />
                      <Skeleton className="h-11 w-full rounded-md" />
                    </div>
                  </div>
                ) : false ? ( // TODO: Change to customer
                  // Authenticated User Actions
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {/* {getUserInitials(user.name)} */}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        {/* <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p> */}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <Button variant="outline" size="lg" asChild className="w-full cursor-pointer">
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <LayoutDashboard className="size-4" />
                        Dashboard
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full cursor-pointer text-destructive hover:text-destructive"
                      onClick={() => {
                        setIsOpen(false)
                        logout()
                      }}
                    >
                      <LogOut className="size-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  // Guest Actions
                  <div className="space-y-3">
                    <Button variant="outline" size="lg" asChild className="w-full cursor-pointer">
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <LayoutDashboard className="size-4" />
                        Dashboard
                      </Link>
                    </Button>

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
      </div>
    </header >
  )
}
