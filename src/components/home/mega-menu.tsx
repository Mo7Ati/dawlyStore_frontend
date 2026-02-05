"use client"

import { Suspense, use } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  browseMarketplaceItems,
  vendorItems,
  resourceItems,
  MenuItem,
} from "@/config/mega-menu-data"
import { getCategoryIcon } from "@/config/category-icons"
import { getStoreCategories } from "@/services/stores/store-service"
import { StoreCategory } from "@/types/general"
import { Grid3X3 } from "lucide-react"

// ============================================================================
// Menu Item Component
// ============================================================================

interface MenuItemLinkProps {
  item: MenuItem
  className?: string
}

/**
 * Individual menu item with icon, title, and optional description
 */
function MenuItemLink({ item, className }: MenuItemLinkProps) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(
        "group flex items-start gap-3 rounded-lg p-3 -mx-3",
        "transition-colors hover:bg-accent focus:bg-accent focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-background group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
          {item.title}
        </p>
        {item.description && (
          <p className="text-xs text-muted-foreground leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  )
}

// ============================================================================
// Menu Column Component
// ============================================================================

interface MenuColumnProps {
  title: string
  children: React.ReactNode
}

/**
 * Column wrapper with section header
 */
function MenuColumn({ title, children }: MenuColumnProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

// ============================================================================
// Categories Column (Lazy Loaded)
// ============================================================================

// Create the promise outside the component to avoid re-fetching on re-renders
let categoriesPromise: Promise<{ data: StoreCategory[] }> | null = null

function getCategoriesPromise() {
  if (!categoriesPromise) {
    categoriesPromise = getStoreCategories()
  }
  return categoriesPromise
}

/**
 * Category link with dynamically assigned icon
 */
interface CategoryLinkProps {
  category: StoreCategory
}

function CategoryLink({ category }: CategoryLinkProps) {
  const Icon = getCategoryIcon(category.name)

  return (
    <Link
      href={`/stores?category=${category.id}`}
      className={cn(
        "group flex items-center gap-3 rounded-lg p-2 -mx-2",
        "transition-colors hover:bg-accent focus:bg-accent focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </span>
    </Link>
  )
}

/**
 * Categories list that fetches data using React's use() hook
 */
function CategoriesList() {
  const { data: categories } = use(getCategoriesPromise())

  if (!categories || categories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground px-2">
        No categories available
      </p>
    )
  }

  // Show first 6 categories with a "View All" link
  const displayCategories = categories.slice(0, 6)
  const hasMore = categories.length > 6

  return (
    <div className="space-y-1">
      {displayCategories.map((category) => (
        <CategoryLink key={category.id} category={category} />
      ))}
      {hasMore && (
        <Link
          href="/stores"
          className={cn(
            "group flex items-center gap-3 rounded-lg p-2 -mx-2 mt-2",
            "transition-colors hover:bg-accent focus:bg-accent focus:outline-none",
            "text-sm font-medium text-primary"
          )}
        >
          <Grid3X3 className="h-4 w-4" />
          View All Categories
        </Link>
      )}
    </div>
  )
}

/**
 * Skeleton loading state for categories
 */
function CategoriesSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}

/**
 * Categories column with Suspense boundary for lazy loading
 */
function CategoriesColumn() {
  return (
    <MenuColumn title="Categories">
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesList />
      </Suspense>
    </MenuColumn>
  )
}

// ============================================================================
// Main Mega Menu Component
// ============================================================================

/**
 * Desktop mega menu with 4-column layout
 * - Column 1: Browse Marketplace
 * - Column 2: Categories (lazy loaded)
 * - Column 3: For Vendors
 * - Column 4: Resources
 */
export function MegaMenu() {
  return (
    <div className="w-[900px] max-w-[95vw] p-6 bg-background">
      <div className="grid grid-cols-4 gap-8">
        {/* Column 1: Browse Marketplace */}
        <MenuColumn title="Browse Marketplace">
          {browseMarketplaceItems.map((item) => (
            <MenuItemLink key={item.title} item={item} />
          ))}
        </MenuColumn>

        {/* Column 2: Categories (Lazy Loaded) */}
        <CategoriesColumn />

        {/* Column 3: For Vendors */}
        <MenuColumn title="For Vendors">
          {vendorItems.map((item) => (
            <MenuItemLink key={item.title} item={item} />
          ))}
        </MenuColumn>

        {/* Column 4: Resources */}
        <MenuColumn title="Resources">
          {resourceItems.map((item) => (
            <MenuItemLink key={item.title} item={item} />
          ))}
        </MenuColumn>
      </div>
    </div>
  )
}

// ============================================================================
// Exports for Mobile Menu
// ============================================================================

export { MenuItemLink, CategoriesList, CategoriesSkeleton }
