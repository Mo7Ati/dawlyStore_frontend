// "use client"
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { AddToCartButton } from '@/app/cart/components/add-to-cart-button'
// import { Product } from '@/types/product'
// import { Store } from '@/types/store'
// import { useAuth } from '@/contexts/auth-context'
// import { useIsInWishlist, useWishlistActions } from '@/stores/wishlist/use-wishlist'
// import { buildWishlistItem } from '@/services/wishlist/wishlist-service'

// type ProductCardProps = {
//     product: Product
//     store?: Store
// }

// const ProductCard = ({ product, store }: ProductCardProps) => {
//     const router = useRouter()
//     const { customer } = useAuth()
//     const storeId = store?.id ?? product.store_id ?? ''
//     const inWishlist = useIsInWishlist(product.id, storeId)
//     const { toggleItem } = useWishlistActions(!!customer)

//     return (
//         <div
//             data-slot="card"
//             className="bg-card text-card-foreground flex flex-col gap-6 relative overflow-hidden rounded-md border py-0 shadow-none transition-all hover:shadow-md cursor-pointer"
//             onClick={() => {
//                 router.push(`/stores/${store?.slug ?? product.store.slug}/products/${product.slug}`)
//             }}
//         >
//             <div data-slot="card-content" className="px-0">
//                 <div className="relative aspect-square w-full overflow-hidden">
//                     <Image
//                         alt={product.name}
//                         className="size-full object-cover"
//                         loading="lazy"
//                         width="500"
//                         height="500"
//                         src={product.images[0]}
//                     />
//                     {/* <div className="absolute start-2 top-2 z-20">
//                         <span data-slot="badge"
//                             className="justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&amp;]:hover:bg-primary/90 flex items-center gap-1 px-2 py-1 text-white backdrop-blur-xs bg-black"><svg
//                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//                                 fill="none" stroke="currentColor"
//                                 className="lucide lucide-flame size-3">
//                                 <path
//                                     d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z">
//                                 </path>
//                             </svg>
//                         </span>
//                     </div> */}
//                     {/* <div
//                         className="bg-background/80 absolute start-2 bottom-2 z-10 flex items-center gap-1 rounded-md border px-2 py-1 text-sm backdrop-blur-xs">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
//                             stroke="currentColor"
//                             className="lucide lucide-star fill-foreground text-foreground size-4">
//                             <path
//                                 d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
//                             </path>
//                         </svg>
//                         <span>{product.rating.value}</span>
//                         <span className="text-muted-foreground">| 1.2k</span>
//                     </div> */}
//                     <div className="absolute end-2 bottom-2 z-10">
//                         <button
//                             data-slot="button"
//                             className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground dark:hover:bg-accent/50 gap-1.5 has-[&gt;svg]:px-2.5 group bg-background/80 hover:bg-background size-8 cursor-pointer overflow-hidden rounded-full p-0 shadow-xs backdrop-blur-xs transition-all duration-200 hover:w-[130px]"
//                             aria-label="View similar products"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24"
//                                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"

//                                 className="lucide lucide-gallery-horizontal-end absolute start-2 size-4 shrink-0">
//                                 <path d="M2 7v10"></path>
//                                 <path d="M6 5v14"></path>
//                                 <rect width="12" height="18" x="10" y="3" rx="2"></rect>
//                             </svg>
//                             <span className="ms-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100">View Product</span></button></div>
//                     <button
//                         type="button"
//                         data-slot="button"
//                         className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([className*='size-'])]:size-4 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 bg-background/80 absolute end-2 top-2 z-20 size-8 cursor-pointer rounded-full p-0 backdrop-blur-xs"
//                         aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//                         onClick={(e) => {
//                             e.stopPropagation()
//                             toggleItem(buildWishlistItem(product, store))
//                         }}
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" className={`lucide lucide-heart size-4 transition-colors text-red-500 hover:fill-red-500 ${inWishlist ? 'fill-red-500' : 'fill-none'}`}>
//                             <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//                         </svg>
//                     </button>
//                 </div>
//                 <div className="p-4">
//                     <div className="space-y-2">
//                         <h3 className="font-medium text-balance">{product.name}</h3>
//                         <p className="text-muted-foreground text-sm text-balance">{product.description?.slice(0, 30)}...</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <span className="font-semibold">${product.price}</span>
//                         {product.compare_price && product.compare_price > product.price && (
//                             <>
//                                 <span className="line-through text-muted-foreground">
//                                     ${product.compare_price.toFixed(2)}
//                                 </span>
//                                 {typeof product.discount_percentage === 'number' && (
//                                     <span className="rounded-full bg-green-600/10 px-2 py-0.5 text-xs font-medium text-green-600">
//                                         {product.discount_percentage}% OFF
//                                     </span>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                     <div className='mt-4' onClick={(e) => e.stopPropagation()}>
//                         <AddToCartButton
//                             product={product}
//                             store={{ id: store?.id ?? product.store_id ?? 'unknown', name: store?.name ?? product.store?.name ?? 'Unknown Store' }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductCard


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

    return (
        <div
            data-slot="card"
            className="bg-card text-card-foreground relative flex h-full cursor-pointer flex-col overflow-hidden rounded-md border py-0 shadow-none transition-all hover:shadow-md"
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
                        // if product.images could be empty, keep a fallback:
                        src={product.images?.[0] ?? "/placeholder.png"}
                    />

                    {/* View Product button */}
                    <div className="absolute bottom-2 end-2 z-10">
                        <button
                            data-slot="button"
                            className="group inline-flex size-8 items-center justify-center overflow-hidden rounded-full bg-background/80 p-0 text-sm font-medium shadow-xs backdrop-blur-xs transition-all duration-200 hover:w-[130px] hover:bg-background"
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
                        className="absolute end-2 top-2 z-20 inline-flex size-8 items-center justify-center rounded-full bg-background/80 p-0 text-sm font-medium backdrop-blur-xs transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
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