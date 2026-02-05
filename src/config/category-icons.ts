import { LucideIcon } from "lucide-react"
import {
  Grid3X3,
  Cpu,
  Shirt,
  UtensilsCrossed,
  Home,
  Car,
  Dumbbell,
  Gamepad2,
  BookOpen,
  Baby,
  PawPrint,
  Flower2,
  Briefcase,
  Music,
  Camera,
  Watch,
  Gem,
  Palette,
  Wrench,
  Pill,
  ShoppingBag,
  Gift,
  Plane,
  Laptop,
  Smartphone,
  Headphones,
  Sofa,
  Utensils,
  Wine,
  Coffee,
} from "lucide-react"

// ============================================================================
// Category to Icon Mapping
// ============================================================================

/**
 * Maps category names (case-insensitive) to Lucide icons.
 * Add new mappings as categories are created in the backend.
 */
const categoryIconMap: Record<string, LucideIcon> = {
  // Technology & Electronics
  electronics: Cpu,
  technology: Laptop,
  computers: Laptop,
  phones: Smartphone,
  mobile: Smartphone,
  audio: Headphones,
  gadgets: Cpu,

  // Fashion & Apparel
  clothing: Shirt,
  fashion: Shirt,
  apparel: Shirt,
  accessories: Watch,
  jewelry: Gem,
  watches: Watch,

  // Food & Beverages
  food: UtensilsCrossed,
  groceries: ShoppingBag,
  restaurants: Utensils,
  beverages: Coffee,
  drinks: Wine,

  // Home & Living
  home: Home,
  furniture: Sofa,
  "home decor": Home,
  garden: Flower2,
  kitchen: UtensilsCrossed,

  // Health & Beauty
  health: Pill,
  beauty: Palette,
  cosmetics: Palette,
  wellness: Dumbbell,
  fitness: Dumbbell,
  sports: Dumbbell,

  // Entertainment
  gaming: Gamepad2,
  games: Gamepad2,
  music: Music,
  movies: Camera,
  books: BookOpen,
  entertainment: Gamepad2,

  // Family & Pets
  baby: Baby,
  kids: Baby,
  children: Baby,
  pets: PawPrint,
  "pet supplies": PawPrint,

  // Automotive
  automotive: Car,
  cars: Car,
  vehicles: Car,
  "auto parts": Wrench,

  // Business & Services
  business: Briefcase,
  office: Briefcase,
  services: Briefcase,
  tools: Wrench,

  // Other
  gifts: Gift,
  travel: Plane,
  art: Palette,
  crafts: Palette,
  handmade: Gift,
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the icon for a category by name.
 * Falls back to Grid3X3 if no mapping exists.
 *
 * @param categoryName - The name of the category (case-insensitive)
 * @returns The corresponding Lucide icon component
 */
export function getCategoryIcon(categoryName: string): LucideIcon {
  const normalizedName = categoryName.toLowerCase().trim()
  return categoryIconMap[normalizedName] || Grid3X3
}

/**
 * Check if a category has a custom icon mapping
 *
 * @param categoryName - The name of the category
 * @returns true if a custom icon exists, false otherwise
 */
export function hasCustomIcon(categoryName: string): boolean {
  const normalizedName = categoryName.toLowerCase().trim()
  return normalizedName in categoryIconMap
}

/**
 * Default icon for categories without a specific mapping
 */
export const defaultCategoryIcon = Grid3X3

export { categoryIconMap }
