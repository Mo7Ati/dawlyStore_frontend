'use client'

import { StoresResponse } from '@/services/stores/store-service'
import { ViewMode } from '@/types/store'
import { Store as StoreIcon } from 'lucide-react'
import { use } from 'react'
import StoresPagination from './stores-pagination'
import StoreCard from '@/components/home/store-card'

interface StoresGridProps {
    responsePromise: Promise<StoresResponse>
    viewMode?: ViewMode
}

const EmptyState = () => (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='bg-muted rounded-full p-4 mb-4'>
            <StoreIcon className='size-8 text-muted-foreground' />
        </div>
        <h3 className='text-lg font-semibold mb-2'>No stores found</h3>
        <p className='text-muted-foreground max-w-md'>
            We couldn't find any stores matching your criteria. Try adjusting your filters or search terms.
        </p>
    </div>
)

const StoresGrid = ({ responsePromise, viewMode = 'grid' }: StoresGridProps) => {
    const { data: stores, extra: paginationMeta } = use(responsePromise);

    if (stores.length === 0) {
        return <EmptyState />
    }
    return (
        <>
            {
                viewMode === 'grid' ? (
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {stores.map(store => (
                            <StoreCard key={store.id} store={store} viewMode='grid' />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-4'>
                        {stores.map(store => (
                            <StoreCard key={store.id} store={store} viewMode='list' />
                        ))}
                    </div>
                )
            }
            <StoresPagination meta={paginationMeta} />
        </>
    )

}

export default StoresGrid
