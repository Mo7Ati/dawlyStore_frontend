"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { MegaMenu } from '../mega-menu'
import { navigationItems, smoothScrollTo } from './nav-config'
import { useRouter } from 'next/navigation'

export function NavbarDesktopNav() {
  const router = useRouter()

  return (
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
  )
}
