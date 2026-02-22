'use client'

import { Suspense } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Search, ChevronDown, X, SlidersHorizontal, LayoutGrid, List } from 'lucide-react'
import { ViewMode } from '@/types/store'
import { debounce, parseAsString, useQueryState } from 'nuqs'
import { cn } from '@/lib/utils'
import { Response } from '@/types/general'
import CategoriesFilter from './categories-filter'
import { StoreCategory } from '@/types/general'


const categories = [
    { id: 'all', name: 'All Products', count: 1247 },
    { id: 'electronics', name: 'Electronics', count: 324 },
    { id: 'clothing', name: 'Clothing', count: 189 },
    { id: 'home', name: 'Home & Garden', count: 156 },
    { id: 'books', name: 'Books', count: 97 },
    { id: 'sports', name: 'Sports', count: 134 },
    { id: 'toys', name: 'Toys', count: 78 },
    { id: 'health', name: 'Health & Beauty', count: 112 },
]

const sortOptions = [
    { id: 'newest', label: 'Newest' },
    { id: 'rating', label: 'Customer Rating' },
]

interface StoresFiltersProps {
    viewMode: ViewMode
    setViewMode: (viewMode: ViewMode) => void
    categoriesResponsePromise: Promise<Response<StoreCategory[]>>

}

export default function StoresFilters({ viewMode, setViewMode, categoriesResponsePromise }: StoresFiltersProps) {
    const [searchQuery, setSearchQuery] = useQueryState('search', parseAsString
        .withDefault('')
        .withOptions({ shallow: false })
    )

    const [selectedCategory, setSelectedCategory] = useQueryState('category', parseAsString.withOptions({ shallow: false }))


    const activeFilters = []
    if (selectedCategory && selectedCategory !== 'all') {
        const category = categories.find(c => c.name === selectedCategory)
        activeFilters.push({ type: 'category', label: category?.name ?? selectedCategory, value: selectedCategory })
    }

    if (searchQuery) {
        activeFilters.push({ type: 'search', label: `"${searchQuery}"`, value: searchQuery })
    }

    const clearFilter = (type: string) => {
        if (type === 'category') setSelectedCategory(null)
        if (type === 'search') setSearchQuery(null)
    }

    const clearAllFilters = () => {
        setSelectedCategory(null)
        setSearchQuery(null)
    }

    return (
        <section className='py-4 sm:py-6 lg:py-8'>
            <div className='mx-auto max-w-7xl px-3 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='mb-4 sm:mb-6 lg:mb-8'>
                    <h2 className='text-2xl font-bold tracking-tight text-balance sm:text-3xl'>Browse Stores</h2>
                    <p className='text-muted-foreground mt-1.5 text-sm sm:mt-2 sm:text-base'>
                        Browse our collection of stores
                    </p>
                </div>

                {/* Horizontal Filter Bar */}
                <div className='mb-4 space-y-3 sm:mb-6 sm:space-y-4'>
                    {/* Search and Sort Row */}
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                        {/* Search + Category Filter */}
                        <div className='flex w-full min-w-0 flex-col gap-3 sm:max-w-2xl sm:flex-1 sm:flex-row sm:flex-wrap sm:items-center'>
                            <div className='relative w-full min-w-0 sm:min-w-[180px] sm:flex-1'>
                                <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 shrink-0' />
                                <Input
                                    placeholder='Search stores...'
                                    value={searchQuery || ''}
                                    onChange={e => setSearchQuery(e.target.value, {
                                        limitUrlUpdates: e.target.value === '' ? undefined : debounce(1000)
                                    })}
                                    className='h-9 w-full min-w-0 pl-9 sm:h-10 sm:pl-10'
                                />
                            </div>
                            <div className='w-full shrink-0 sm:w-auto'>
                                <Suspense fallback={<div className='h-9 w-full rounded-md bg-muted animate-pulse sm:w-36' />}>
                                    <CategoriesFilter categoriesResponsePromise={categoriesResponsePromise} selectedCategory={selectedCategory || 'all'} setSelectedCategory={setSelectedCategory} />
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2'>
                            <span className='text-muted-foreground w-full shrink-0 text-sm font-medium sm:w-auto'>Active filters:</span>
                            <div className='flex min-w-0 flex-1 flex-wrap items-center gap-2'>
                                {activeFilters.map((filter, index) => (
                                    <Badge key={index} variant='secondary' className='max-w-full shrink-0'>
                                        <span className='truncate'>{filter.label}</span>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            className='h-auto shrink-0 cursor-pointer p-1! text-inherit'
                                            onClick={() => clearFilter(filter.type)}
                                        >
                                            <X className='size-3' />
                                        </Button>
                                    </Badge>
                                ))}
                                <DropdownMenuSeparator className='mx-0 sm:mx-2' />
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={clearAllFilters}
                                    className='text-muted-foreground h-auto shrink-0 cursor-pointer p-1.5 text-xs'
                                >
                                    Clear all
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}