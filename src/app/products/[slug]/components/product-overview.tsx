'use client'

import { useState, use, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Response } from '@/types/general'
import { Product } from '@/types/product'
import { AddToCartButton } from '@/app/cart/components/add-to-cart-button'
import { CartItemOption, CartItemAddition } from '@/stores/cart/cart-types'
import { Button } from '@/components/ui/button'

export function ProductOverview({ productPromise }: { productPromise: Promise<Response<Product>> }) {
  const { data: product } = use(productPromise)

  const {
    id,
    name,
    description,
    price,
    compare_price,
    discount_percentage,
    rating,
    images,
    additions,
    options,
    store,
    category,
  } = product

  const hasImages = images && images.length > 0

  // State for selected option (single selection)
  const [selectedOption, setSelectedOption] = useState<CartItemOption | null>(null)

  // State for selected additions (multiple selection)
  const [selected_additions, setselected_additions] = useState<CartItemAddition[]>([])

  // State for selected image in gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Toggle addition selection
  const toggleAddition = (addition: { id: string; name: string; price: number }) => {
    setselected_additions((prev) => {
      const exists = prev.find((a) => a.id === addition.id)
      if (exists) {
        return prev.filter((a) => a.id !== addition.id)
      }
      return [...prev, { id: addition.id, name: addition.name, price: addition.price }]
    })
  }

  // Check if an addition is selected
  const isAdditionSelected = (additionId: string) => {
    return selected_additions.some((a) => a.id === additionId)
  }

  // Calculate total price including option and additions
  const totalPrice = useMemo(() => {
    let total = price
    if (selectedOption) {
      total += selectedOption.price
    }
    total += selected_additions.reduce((sum, add) => sum + add.price, 0)
    return total
  }, [price, selectedOption, selected_additions])

  return (
    <section className="py-6 sm:py-10 md:py-12 lg:py-8">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-8 xl:gap-24">
          {/* LEFT – GALLERY */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-muted h-[280px] min-[480px]:h-[340px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
              {hasImages && (
                <Image
                  src={images[selectedImageIndex] ?? images[0]}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-300"
                  priority
                />
              )}
            </div>

            {hasImages && images.length > 1 && (
              <div className="mt-1 flex gap-1.5 sm:gap-2 overflow-x-auto pb-1">
                {images.map((image, index) => {
                  const isActive = selectedImageIndex === index
                  return (
                    <button
                      key={image + index}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-md border bg-gray-100 transition-all duration-200 ${isActive
                        ? 'border-primary ring-2 ring-primary/40 scale-[1.02]'
                        : 'border-transparent hover:border-primary/60 hover:brightness-105'
                        }`}
                    >
                      <Image
                        src={image}
                        alt={`${name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* RIGHT – DETAILS */}
          <div className="space-y-4 sm:space-y-6 py-2 sm:py-5">

            {/* Breadcrumb with Store & Category */}
            <nav className="text-muted-foreground text-xs sm:text-sm flex flex-wrap items-center gap-x-1 gap-y-0.5">
              <Link href={`/stores/${store.slug}`} className="hover:text-foreground transition">
                {store.name}
              </Link>
              <span>{">"}</span>
              <Link href={`/stores/${store.slug}?category=${category.slug}`} className="hover:text-foreground transition">
                {category.name}
              </Link>
              <span>{">"}</span>
              <span className="text-foreground truncate min-w-0">{name}</span>
            </nav>

            {/* Rating */}
            <div className="flex w-fit items-center gap-2 rounded border px-2.5 sm:px-3 py-1.5">
              {rating?.value && (
                <span className="text-base sm:text-lg font-medium">4.8</span> //{rating.value.toFixed(1)}
              )}
              <span className="text-muted-foreground text-sm">
                {rating?.count} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h4 className="text-2xl sm:text-3xl font-bold">
                ${totalPrice.toFixed(2)}
              </h4>
              {compare_price && compare_price > price && (
                <>
                  <span className="line-through text-muted-foreground">
                    MRP ${compare_price.toFixed(2)}
                  </span>
                  {typeof discount_percentage === 'number' && (
                    <span className="rounded-full bg-green-600/10 px-2 py-0.5 text-xs font-medium text-green-600">
                      {discount_percentage}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="text-muted-foreground text-sm sm:text-base">
              {description}
            </p>

            <hr />

            {/* Options (Single Selection) */}
            {/* {options && options.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">
                  Options
                  {selectedOption && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      — {selectedOption.name} {selectedOption.price > 0 && `(+$${selectedOption.price.toFixed(2)})`}
                    </span>
                  )}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(
                        selectedOption?.id === option.id ? null : { id: option.id, name: option.name, price: option.price }
                      )}
                      className={cn(
                        "rounded-md border px-4 py-2 text-sm font-medium transition",
                        selectedOption?.id === option.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:border-primary hover:bg-primary/10"
                      )}
                    >
                      {option.name}
                      {option.price > 0 && (
                        <span className="ml-1 text-xs opacity-70">+${option.price.toFixed(2)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            {/* Additions (Multiple Selection) */}
            {/* {additions && additions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">
                  Additions
                  {selected_additions.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      — {selected_additions.length} selected
                    </span>
                  )}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {additions.map((addition) => (
                    <button
                      key={addition.id}
                      onClick={() => toggleAddition(addition)}
                      className={cn(
                        "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition",
                        isAdditionSelected(addition.id)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:border-primary hover:bg-primary/10"
                      )}
                    >
                      {isAdditionSelected(addition.id) && (
                        <Check className="h-4 w-4" />
                      )}
                      {addition.name}
                      {addition.price > 0 && (
                        <span className="text-xs opacity-70">+${addition.price.toFixed(2)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )} */}



            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <AddToCartButton
                product={product}
                store={store}
                selected_options={selectedOption ? [selectedOption] : []}
                selected_additions={selected_additions}
                showQuantityControls
                className="w-full sm:flex-1 min-w-0"
              />
              <button className="rounded-md bg-secondary px-6 py-2.5 sm:py-2 hover:bg-secondary/80 transition w-full sm:w-auto shrink-0">
                Wish List
              </button>
            </div>

            <hr />

            {/* Info Boxes */}
            <div className="rounded-md border divide-y">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4">
                <span className="text-base sm:text-lg font-semibold shrink-0">Free Delivery</span>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  Enter your postal code for delivery availability
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4">
                <span className="text-base sm:text-lg font-semibold shrink-0">Return Delivery</span>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  Free 30 Days Delivery Returns. <a className="underline cursor-pointer">Details</a>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductOverview

