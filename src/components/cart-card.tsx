'use client'

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, X, Minus, Plus, Clock, ShieldCheck } from "lucide-react"
import { useCartSummary, useCart } from "@/stores/cart/use-cart"
import { CartItem } from "@/stores/cart/cart-types"
import { Button } from "./ui/button"

function CartItemRow({ item, storeName }: { item: CartItem; storeName: string }) {
    const { incrementQuantity, decrementQuantity, removeItem } = useCart()

    return (
        <div className="flex items-start gap-3 py-3">
            {/* Product Image */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                    src={item.productImageUrl}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="48px"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-1">{item.productName}</h4>
                <p className="text-xs text-muted-foreground">
                    {item.selected_options.length > 0
                        ? item.selected_options.map(opt => opt.name).join(', ')
                        : storeName}
                </p>
                <p className="text-sm font-semibold mt-0.5">${item.unitPrice.toFixed(2)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-1 text-muted-foreground">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(item.cartItemId)}
                    aria-label="Decrease quantity"
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center text-sm text-foreground">{item.quantity}</span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(item.cartItemId)}
                    aria-label="Increase quantity"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            {/* Remove Button */}
            <Button
                variant="destructive"
                size="icon"
                onClick={() => removeItem(item.cartItemId)}
                aria-label="Remove item"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}


export default function CartCard({ isOpen = false, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const cartSummary = useCartSummary()

    // Calculate tax (example: 8%)
    const taxRate = 0.08
    const tax = cartSummary.grandTotal * taxRate

    // Close dropdown when clicking outside of the card 
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            ref={cardRef}
            className="absolute right-0 top-full mt-2 w-[340px] z-50"
        >
            <div className="bg-card text-card-foreground flex flex-col rounded-xl border shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="flex items-center gap-2 font-semibold">
                        <ShoppingCart className="h-5 w-5" />
                        Shopping Cart ({cartSummary.totalItems})
                    </div>
                    <button
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close cart"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-4">
                    {cartSummary.isEmpty ? (
                        <div className="py-8 text-center">
                            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-sm text-muted-foreground">Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            {/* Gift Banner */}
                            {/* <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 my-3">
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                    <Gift className="h-4 w-4" />
                                    <span className="text-sm font-medium">Free gift wrapping activated!</span>
                                </div>
                            </div> */}

                            {/* Product List (Scrollable) */}
                            <div className="max-h-64 overflow-y-auto divide-y">
                                {cartSummary.storeGroups.flatMap((group) =>
                                    group.items.map((item) => (
                                        <CartItemRow key={item.cartItemId} item={item} storeName={group.storeName} />
                                    ))
                                )}
                            </div>

                            {/* Totals */}
                            <div className="py-4 space-y-2 border-t">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${cartSummary.grandTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                {/* <div className="flex justify-between text-sm">
                                    <span className="text-green-600">Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div> */}
                                <div className="flex justify-between text-base font-semibold pt-2">
                                    <span>Total</span>
                                    <span>${(cartSummary.grandTotal + tax).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Express Checkout */}
                            <div className="flex items-center justify-between py-3 border-t">
                                <span className="text-sm text-muted-foreground">Express checkout</span>
                                <button className="px-4 py-1.5 text-sm font-medium border rounded-md hover:bg-accent transition-colors">
                                    Express
                                </button>
                            </div>

                            {/* Checkout Button */}
                            <Link
                                href="/cart"
                                onClick={() => setIsOpen(false)}
                                className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center mb-3"
                            >
                                View Cart &amp; Checkout
                            </Link>

                            {/* Footer Info */}
                            <div className="py-3 border-t space-y-2">
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Estimated delivery: 2-3 business days</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-xs text-green-600">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    <span>Secure checkout • SSL encrypted</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
