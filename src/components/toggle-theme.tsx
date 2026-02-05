"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface ModeToggleProps {
    variant?: "outline" | "ghost" | "default"
}

export function ModeToggle({ variant = "outline" }: ModeToggleProps) {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch by only rendering after mount
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Render a placeholder with the same dimensions during SSR
    if (!mounted) {
        return (
            <Button
                variant={variant}
                size="icon"
                className="cursor-pointer mode-toggle-button relative overflow-hidden"
                disabled
            >
                <span className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <Button
            variant={variant}
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="cursor-pointer mode-toggle-button relative overflow-hidden"
        >
            {/* Show the icon for the mode you can switch TO */}
            {isDark ? (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 rotate-0 scale-100" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 rotate-0 scale-100" />
            )}
            <span className="sr-only">
                Switch to {isDark ? "light" : "dark"} mode
            </span>
        </Button>
    )
}