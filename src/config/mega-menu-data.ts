import { LucideIcon } from "lucide-react"
import {
  ShoppingBag,
  Star,
  TrendingUp,
  Percent,
  Sparkles,
  Store,
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  Headphones,
} from "lucide-react"

// ============================================================================
// Types
// ============================================================================

export type MenuItem = {
  title: string
  description?: string
  href: string
  icon: LucideIcon
  external?: boolean
}

export type MenuColumn = {
  title: string
  items: MenuItem[]
}

// ============================================================================
// Menu Data Configuration
// ============================================================================

/**
 * Browse Marketplace - Links for buyers to explore products
 */
export const browseMarketplaceItems: MenuItem[] = [
  {
    title: "All Stores",
    description: "Browse our complete catalog",
    href: "/stores",
    icon: Store,
  },
  {
    title: "Top Rated",
    description: "Highest rated by customers",
    href: "/stores?sort=rating",
    icon: Star,
  },
  {
    title: "Trending",
    description: "Popular products right now",
    href: "/stores?sort=trending",
    icon: TrendingUp,
  },
  {
    title: "Deals & Discounts",
    description: "Save on great products",
    href: "/stores?filter=deals",
    icon: Percent,
  },
  {
    title: "New Arrivals",
    description: "Latest additions to the marketplace",
    href: "/stores?sort=newest",
    icon: Sparkles,
  },
]

/**
 * For Vendors - Links for sellers and store owners
 */
export const vendorItems: MenuItem[] = [
  {
    title: "Open a Store",
    description: "Start selling on our marketplace",
    href: "/become-a-vendor",
    icon: ShoppingBag,
  },
  {
    title: "Vendor Dashboard",
    description: "Manage your store and orders",
    href: `${process.env.NEXT_PUBLIC_BACKEND_URL}/store`,
    icon: LayoutDashboard,
  },
]

/**
 * Resources - Help and documentation links
 */
export const resourceItems: MenuItem[] = [
  {
    title: "How It Works",
    description: "Learn about our marketplace",
    href: "/how-it-works",
    icon: HelpCircle,
  },
  {
    title: "Vendor Guide",
    description: "Everything you need to succeed",
    href: "/vendor-guide",
    icon: BookOpen,
  },
  {
    title: "Help Center",
    description: "Get support and answers",
    href: "/help",
    icon: Headphones,
  },
]

// ============================================================================
// Column Configurations
// ============================================================================

export const megaMenuColumns: MenuColumn[] = [
  {
    title: "Browse Marketplace",
    items: browseMarketplaceItems,
  },
  // Note: Categories column is handled separately with lazy loading
  {
    title: "For Vendors",
    items: vendorItems,
  },
  {
    title: "Resources",
    items: resourceItems,
  },
]

/**
 * Mobile menu configuration - flattened structure for accordion
 */
export const mobileMenuSections = [
  {
    title: "Browse Marketplace",
    items: browseMarketplaceItems,
  },
  {
    title: "Categories",
    // Categories are loaded dynamically
    isDynamic: true,
  },
  {
    title: "For Vendors",
    items: vendorItems,
  },
  {
    title: "Resources",
    items: resourceItems,
  },
] as const
