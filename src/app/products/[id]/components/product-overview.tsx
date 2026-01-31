'use client'

import { useState, use, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Response } from '@/types/general'
import { Product } from '@/types/product'
import { AddToCartButton } from '@/app/cart/components/add-to-cart-button'
import { CartItemOption, CartItemAddition } from '@/stores/cart/cart-types'
import { cn } from '@/lib/utils'

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
    image_url,
    additions,
    options,
    store,
    category,
  } = product

  console.log(product);
  
  // State for selected option (single selection)
  const [selectedOption, setSelectedOption] = useState<CartItemOption | null>(null)

  // State for selected additions (multiple selection)
  const [selectedAdditions, setSelectedAdditions] = useState<CartItemAddition[]>([])

  // Toggle addition selection
  const toggleAddition = (addition: { id: string; name: string; price: number }) => {
    setSelectedAdditions((prev) => {
      const exists = prev.find((a) => a.id === addition.id)
      if (exists) {
        return prev.filter((a) => a.id !== addition.id)
      }
      return [...prev, { id: addition.id, name: addition.name, price: addition.price }]
    })
  }

  // Check if an addition is selected
  const isAdditionSelected = (additionId: string) => {
    return selectedAdditions.some((a) => a.id === additionId)
  }

  // Calculate total price including option and additions
  const totalPrice = useMemo(() => {
    let total = price
    if (selectedOption) {
      total += selectedOption.price
    }
    total += selectedAdditions.reduce((sum, add) => sum + add.price, 0)
    return total
  }, [price, selectedOption, selectedAdditions])

  return (
    <section className="py-8 sm:py-16 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 xl:gap-24">
          {/* LEFT – GALLERY */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full overflow-hidden rounded-md bg-gray-100 h-[560px]">
              <Image
                src={image_url?.toString()}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="space-y-6 py-5">

            {/* Breadcrumb with Store & Category */}
            <nav className="text-muted-foreground text-sm flex items-center gap-1">
              <Link href={`/stores/${store.id}`} className="hover:text-foreground transition">
                {store.name}
              </Link>
              <span>{">"}</span>
              <Link href={`/stores/${store.id}?category=${category.id}`} className="hover:text-foreground transition">
                {category.name}
              </Link>
              <span>{">"}</span>
              <span className="text-foreground">{name}</span>
            </nav>

            {/* Rating */}
            <div className="flex w-fit items-center gap-2 rounded border px-3 py-1.5">
              {rating?.value && (
                <span className="text-lg font-medium">4.8</span> //{rating.value.toFixed(1)}
              )}
              <span className="text-muted-foreground text-sm">
                {rating?.count} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <h4 className="text-3xl font-bold">
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

            <p className="text-muted-foreground">
              {description}
            </p>

            <hr />

            {/* Options (Single Selection) */}
            {options && options.length > 0 && (
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
            )}

            {/* Additions (Multiple Selection) */}
            {additions && additions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">
                  Additions
                  {selectedAdditions.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      — {selectedAdditions.length} selected
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
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <AddToCartButton
                product={{
                  id: id.toString(),
                  name,
                  image_url,
                  price,
                  comparePrice: compare_price,
                  discountPercentage: discount_percentage,
                }}
                store={store}
                selectedOptions={selectedOption ? [selectedOption] : []}
                selectedAdditions={selectedAdditions}
                showQuantityControls
                className="flex-1"
              />
              <button className="rounded-md bg-secondary px-6 py-2 hover:bg-secondary/80 transition">
                Wish List
              </button>
            </div>

            <hr />

            {/* Info Boxes */}
            <div className="rounded-md border divide-y">
              <div className="flex items-center gap-6 px-6 py-4">
                <span className="text-lg font-semibold">Free Delivery</span>
                <span className="text-muted-foreground text-sm">
                  Enter your postal code for delivery availability
                </span>
              </div>

              <div className="flex items-center gap-6 px-6 py-4">
                <span className="text-lg font-semibold">Return Delivery</span>
                <span className="text-muted-foreground text-sm">
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

