'use client'

import { Suspense, useState } from 'react'
import StoresFilters from './stores-filters'
import StoresGrid from './stores-grid'
import { StoresResponse } from '@/services/stores/store-service'
import { ViewMode } from '@/types/store'
import StoresSkeleton from './stores-skeleton'
import { Response } from '@/types/general'
import { StoreCategory } from '@/types/general'

interface StoresContainerProps {
    storesResponsePromise: Promise<StoresResponse>
    categoriesResponsePromise: Promise<Response<StoreCategory[]>>
}

const StoresContainer = ({ storesResponsePromise, categoriesResponsePromise }: StoresContainerProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('list')

    return (
        <div className='min-h-screen'>
            {/* Main Content */}
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12'>
                <StoresFilters
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    categoriesResponsePromise={categoriesResponsePromise}
                />

                {/* Stores Grid */}
                <Suspense fallback={<StoresSkeleton count={6} />}>
                    <StoresGrid
                        responsePromise={storesResponsePromise}
                        viewMode={viewMode}
                    />
                </Suspense>

            </div>
        </div>
    )
}

export default StoresContainer
