'use client'

import { Response } from '@/types/general'
import { Product } from '@/types/product'
import Image from 'next/image'
import { use } from 'react'

  
export function ProductOverview({ productPromise }: { productPromise: Promise<Response<Product>> }) {
  const { data: product } = use(productPromise)

  const {
    name,
    description,
    price,
    compare_price,
    discount_percentage,
    rating,
    image_url,
    additions,
    options,
  } = product



  return (
    <section className="py-8 sm:py-16 lg:py-24">
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

            {/* <div className="flex justify-between gap-4">
              {thumbnailImages.slice(0, 4).map((img, index) => (
                <button
                  key={`${img.url}-${index}`}
                  type="button"
                  className="overflow-hidden rounded-md border hover:ring-2 hover:ring-primary transition"
                >
                  <Image
                    src={img.url}
                    alt={img.alt || name}
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* RIGHT – DETAILS */}
          <div className="space-y-6 py-5">

            {/* Breadcrumb */}
            {/* {breadcrumb && (
              <nav className="text-muted-foreground text-sm">
                {breadcrumb} / <span className="text-foreground">{name}</span>
              </nav>
            )} */}

            <h1 className="text-3xl font-semibold">{name}</h1>

            {/* Rating */}
            <div className="flex w-fit items-center gap-2 rounded border px-3 py-1.5">
              {/* <span className="text-lg font-medium">{rating?.value?.toFixed(1)}</span> */}
              <span className="text-muted-foreground text-sm">
                {rating?.count} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <h4 className="text-3xl font-bold">
                ${price.toFixed(2)}
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

            {/* Colors */}
            {options.length > 0 && (
              <div className="flex items-center gap-6">
                <h4 className="text-lg font-semibold">Color:</h4>
                <div className="flex gap-3">
                  {options.map((option) => (
                    <span
                      key={option.id}
                      className={`size-5 rounded-full  border cursor-pointer`} //bg-${color}-500
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {additions.length > 0 && (
              <div className="flex items-center gap-6">
                <h4 className="text-lg font-semibold">Size:</h4>
                <div className="flex gap-3">
                  {additions.map((addition) => (
                    <button
                      key={addition.id}
                      className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition"
                    >
                      {addition.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                className="flex-1 rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 transition"
              >
                Add to Cart
              </button>
              <button className="flex-1 rounded-md bg-secondary px-6 py-2 hover:bg-secondary/80 transition">
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
                  Free 30 Days Delivery Returns. <a className="underline">Details</a>
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

