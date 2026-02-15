// ============================================================================
// Navigation Configuration
// ============================================================================

type NavigationItem = {
  name: string
  href: string
  hasMegaMenu?: boolean
}

export const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Marketplace', href: '/marketplace', hasMegaMenu: true },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
] as const

/**
 * Smooth scroll to a target element by ID
 */
export function smoothScrollTo(targetId: string) {
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

export function getUserInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
