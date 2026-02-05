"use client"

import { Suspense, use, useState } from "react"
import Link from "next/link"
import { ChevronDown, Grid3X3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  browseMarketplaceItems,
  vendorItems,
  resourceItems,
  MenuItem,
} from "@/config/mega-menu-data"
import { getStoreCategories } from "@/services/stores/store-service"
import { StoreCategory } from "@/types/general"

// ============================================================================
// Types
// ============================================================================

interface MobileMegaMenuProps {
  onItemClick?: () => void
}

interface MobileMenuSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

// ============================================================================
// Mobile Menu Section (Collapsible)
// ============================================================================

/**
 * Collapsible section for mobile menu
 */
function MobileMenuSection({
  title,
  children,
  defaultOpen = false,
}: MobileMenuSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between px-4 py-3",
          "text-base font-medium rounded-lg transition-colors",
          "hover:bg-accent focus:bg-accent focus:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-2">
        <div className="pl-4 border-l-2 border-border space-y-1 mt-2">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ============================================================================
// Mobile Menu Item
// ============================================================================

interface MobileMenuItemProps {
  item: MenuItem
  onItemClick?: () => void
}

/**
 * Individual menu item for mobile view
 */
function MobileMenuItem({ item, onItemClick }: MobileMenuItemProps) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onItemClick}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg",
        "text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:outline-none"
      )}
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div>
        <span className="font-medium">{item.title}</span>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  )
}

// ============================================================================
// Mobile Categories Section (Lazy Loaded)
// ============================================================================

// Promise singleton for categories
let categoriesPromise: Promise<{ data: StoreCategory[] }> | null = null

function getCategoriesPromise() {
  if (!categoriesPromise) {
    categoriesPromise = getStoreCategories()
  }
  return categoriesPromise
}

interface MobileCategoriesListProps {
  onItemClick?: () => void
}

/**
 * Categories list for mobile that fetches data using React's use() hook
 */
function MobileCategoriesList({ onItemClick }: MobileCategoriesListProps) {
  const { data: categories } = use(getCategoriesPromise())

  if (!categories || categories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground px-3 py-2">
        No categories available
      </p>
    )
  }

  return (
    <>
      {categories.map((category) => {
        // const Icon = getCategoryIcon(category.name)
        return (
          <Link
            key={category.id}
            href={`/stores?category=${category.id}`}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg",
              "text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:bg-accent focus:outline-none"
            )}
          >
            {/* <Icon className="h-4 w-4 text-muted-foreground" /> */}
            <span>{category.name}</span>
          </Link>
        )
      })}
      <Link
        href="/stores"
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg mt-1",
          "text-sm font-medium text-primary transition-colors",
          "hover:bg-accent focus:bg-accent focus:outline-none"
        )}
      >
        <Grid3X3 className="h-4 w-4" />
        View All Categories
      </Link>
    </>
  )
}

/**
 * Skeleton loading state for mobile categories
 */
function MobileCategoriesSkeleton() {
  return (
    <div className="space-y-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  )
}

/**
 * Categories section with Suspense boundary
 */
function MobileCategoriesSection({ onItemClick }: MobileCategoriesListProps) {
  return (
    <MobileMenuSection title="Categories">
      <Suspense fallback={<MobileCategoriesSkeleton />}>
        <MobileCategoriesList onItemClick={onItemClick} />
      </Suspense>
    </MobileMenuSection>
  )
}

// ============================================================================
// Main Mobile Mega Menu Component
// ============================================================================

/**
 * Mobile-friendly mega menu with accordion-style collapsible sections
 * Used within the Sheet component in the navbar
 */
export function MobileMegaMenu({ onItemClick }: MobileMegaMenuProps) {
  return (
    <div className="space-y-1">
      {/* Browse Marketplace Section */}
      <MobileMenuSection title="Browse Marketplace" defaultOpen>
        {browseMarketplaceItems.map((item) => (
          <MobileMenuItem key={item.title} item={item} onItemClick={onItemClick} />
        ))}
      </MobileMenuSection>

      {/* Categories Section (Lazy Loaded) */}
      <MobileCategoriesSection onItemClick={onItemClick} />

      {/* For Vendors Section */}
      <MobileMenuSection title="For Vendors">
        {vendorItems.map((item) => (
          <MobileMenuItem key={item.title} item={item} onItemClick={onItemClick} />
        ))}
      </MobileMenuSection>

      {/* Resources Section */}
      <MobileMenuSection title="Resources">
        {resourceItems.map((item) => (
          <MobileMenuItem key={item.title} item={item} onItemClick={onItemClick} />
        ))}
      </MobileMenuSection>
    </div>
  )
}

export { MobileMenuSection, MobileMenuItem }
