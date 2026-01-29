'use client'

import { Response } from '@/types/general'
import { type StoreOverview } from '@/services/stores/store-types'
import { use } from 'react'
import StoreHeader from './store-header'
import CategoryTabs from './category-tabs'
import ProductsGrid from './products-grid'

interface StoreOverviewProps {
    storePromise: Promise<Response<StoreOverview>>
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
                        categories={store.categories}
                        products={store.products}
                    />
                </div>
            </div>
        </section>
    )
}

export default StoreOverview
