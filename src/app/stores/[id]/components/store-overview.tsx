'use client'

import { Response } from '@/types/general'
import { use } from 'react'
import StoreHeader from './store-header'
import ProductsGrid from './products-grid'
import { Store } from '@/types/store'

interface StoreOverviewProps {
    storePromise: Promise<Response<Store>>
}

const StoreOverview = ({ storePromise }: StoreOverviewProps) => {
    const { data: store } = use(storePromise)

    return (
        <section className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Store Header */}
                <StoreHeader store={store} />

                {/* Products by Category */}
                <div className="mt-8">
                    {/* <CategoryTabs
                        categories={store.categories}
                        products={store.products}
                    /> */}

                    <ProductsGrid
                        categories={store.categories ?? []}
                        products={store.products ?? []}
                        store={store}
                    />
                </div>
            </div>
        </section>
    )
}

export default StoreOverview
