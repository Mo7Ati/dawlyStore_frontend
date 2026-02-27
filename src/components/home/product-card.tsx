"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { AddToCartButton } from "@/app/cart/components/add-to-cart-button"
import type { Product } from "@/types/product"
import type { Store } from "@/types/store"
import { useAuth } from "@/contexts/auth-context"
import { useIsInWishlist, useWishlistActions } from "@/stores/wishlist/use-wishlist"
import { buildWishlistItem } from "@/services/wishlist/wishlist-service"

type ProductCardProps = {
    product: Product
    store?: Store
}

const ProductCard = ({ product, store }: ProductCardProps) => {
    const router = useRouter()
    const { customer } = useAuth()

    const storeId = store?.id ?? product.store_id ?? ""
    const inWishlist = useIsInWishlist(product.id, storeId)
    const { toggleItem } = useWishlistActions(!!customer)

    const productUrl = `/stores/${store?.slug ?? product.store?.slug}/products/${product.slug}`
    const imageSrc = product.images?.[0] || "/fallback.png"

    return (
        <div
            data-slot="card"
            className="bg-card text-card-foreground relative flex h-full flex-col overflow-hidden rounded-md border py-0 shadow-none transition-all hover:shadow-md"
            onClick={() => router.push(productUrl)}
        >
            <div data-slot="card-content" className="flex h-full flex-col px-0">
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                        alt={product.name}
                        className="size-full object-cover"
                        loading="lazy"
                        width={500}
                        height={500}
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                        src={imageSrc}
                    />

                    {/* View Product button */}
                    <div className="absolute bottom-2 end-2 z-10">
                        <button
                            data-slot="button"
                            className="group cursor-pointer inline-flex size-8 items-center justify-center overflow-hidden rounded-full bg-background/80 p-0 text-sm font-medium shadow-xs backdrop-blur-xs transition-all duration-200 hover:w-[130px] hover:bg-background"
                            aria-label="View similar products"
                            onClick={(e) => {
                                e.stopPropagation()
                                router.push(productUrl)
                            }}
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="absolute start-2 size-4 shrink-0"
                            >
                                <path d="M2 7v10" />
                                <path d="M6 5v14" />
                                <rect width="12" height="18" x="10" y="3" rx="2" />
                            </svg>
                            <span className="ms-6 whitespace-nowrap text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                View Product
                            </span>
                        </button>
                    </div>

                    {/* Wishlist button */}
                    <button
                        type="button"
                        data-slot="button"
                        className="absolute end-2 top-2 z-20 inline-flex cursor-pointer size-8 items-center justify-center rounded-full bg-background/80 p-0 text-sm font-medium backdrop-blur-xs transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
                        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleItem(buildWishlistItem(product, store))
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`lucide lucide-heart size-4 transition-colors text-red-500 hover:fill-red-500 ${inWishlist ? "fill-red-500" : "fill-none"
                                }`}
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                </div>

                {/* Body (fixed-height behavior) */}
                <div className="flex flex-1 flex-col p-4">
                    {/* Text area: clamp + min heights => consistent card heights */}
                    <div className="space-y-2">
                        {/* 2 lines reserved even if short */}
                        <h3 className="min-h-[2.75rem] text-balance font-medium line-clamp-2">
                            {product.name}
                        </h3>

                        {/* 2 lines reserved even if short */}
                        <p className="min-h-[2.5rem] text-balance text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                        </p>
                    </div>

                    {/* Bottom pinned */}
                    <div className="mt-auto">
                        <div className="mt-3 flex items-center gap-2">
                            <span className="font-semibold">${product.price}</span>

                            {product.compare_price && product.compare_price > product.price && (
                                <>
                                    <span className="text-muted-foreground line-through">
                                        ${product.compare_price.toFixed(2)}
                                    </span>

                                    {typeof product.discount_percentage === "number" && (
                                        <span className="rounded-full bg-green-600/10 px-2 py-0.5 text-xs font-medium text-green-600">
                                            {product.discount_percentage}% OFF
                                        </span>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                            <AddToCartButton
                                product={product}
                                store={{
                                    id: store?.id ?? product.store_id ?? "unknown",
                                    name: store?.name ?? product.store?.name ?? "Unknown Store",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard