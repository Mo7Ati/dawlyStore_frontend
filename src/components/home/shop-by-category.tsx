"use client"

import Link from 'next/link'
import Image from 'next/image'
import { CategoryListSectionData } from '@/types/home-types'

interface ShopByCategoriesProps {
    categories: CategoryListSectionData[],
    title: string,
    description: string,
}

export function ShopByCategories({ data }: { data: ShopByCategoriesProps }) {
    return (
        <section className="mx-auto max-w-7xl px-8 py-12">
            <header className="mb-8 text-center">
                {data.title && <h2 className="text-3xl font-bold tracking-tight text-balance">{data.title}</h2>}
                {data.description && <p className='text-muted-foreground text-base text-pretty'>{data.description}</p>}
            </header>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {
                    data.categories.map((category) => (
                        <div
                            key={category.id}
                            data-slot="card"
                            className="text-card-foreground flex flex-col gap-6 rounded-xl group relative overflow-hidden border-0 bg-transparent py-0 shadow-none transition-all"
                        >
                            <div data-slot="card-content" className="p-0">
                                <Link href={`/stores?${category.id}`} className="flex flex-col items-center text-center no-underline" aria-label={category.name}>
                                    <div className="relative aspect-square w-full overflow-hidden rounded-full">
                                        <div
                                            className="absolute inset-0 z-10 bg-linear-to-b from-black/10 via-black/20 to-black/60 transition-colors group-hover:to-black/70">
                                        </div>
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            className="duration- 300 size-full object-cover grayscale transition-all group-hover:scale-110 group-hover:grayscale-0"
                                            width="200" height="200" loading="lazy"
                                        />
                                    </div>
                                    <h3
                                        className="text-foreground group-hover:text-primary mt-3 text-sm font-medium transition-colors md:text-base">
                                        {category.name}
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default ShopByCategories