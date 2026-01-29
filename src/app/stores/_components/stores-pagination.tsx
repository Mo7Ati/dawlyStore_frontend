'use client'

import { Button } from '@/components/ui/button'
import { StoresPaginationMeta } from '@/types/store'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQueryState, parseAsInteger } from 'nuqs'

interface StoresPaginationProps {
    meta: StoresPaginationMeta
}

const StoresPagination = ({ meta }: StoresPaginationProps) => {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({ shallow: false }))
    
    const totalPages = Math.ceil(meta.total / meta.per_page)
    const currentPage = meta.page

    if (totalPages <= 1) {
        return null
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (meta.has_more) {
            setPage(currentPage + 1)
        }
    }

    // Calculate start and end item numbers for display
    const startItem = (currentPage - 1) * meta.per_page + 1
    const endItem = Math.min(currentPage * meta.per_page, meta.total)

    return (
        <div className='flex items-center justify-between border-t pt-6 mt-8'>
            <p className='text-sm text-muted-foreground'>
                Showing <span className='font-medium'>{startItem}</span> to{' '}
                <span className='font-medium'>{endItem}</span> of{' '}
                <span className='font-medium'>{meta.total}</span> stores
            </p>
            
            <div className='flex items-center gap-2'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={handlePrevious}
                    disabled={currentPage <= 1}
                    className='cursor-pointer'
                >
                    <ChevronLeft className='size-4 me-1' />
                    Previous
                </Button>
                
                <span className='text-sm text-muted-foreground px-4'>
                    Page {currentPage} of {totalPages}
                </span>
                
                <Button
                    variant='outline'
                    size='sm'
                    onClick={handleNext}
                    disabled={!meta.has_more}
                    className='cursor-pointer'
                >
                    Next
                    <ChevronRight className='size-4 ms-1' />
                </Button>
            </div>
        </div>
    )
}

export default StoresPagination
