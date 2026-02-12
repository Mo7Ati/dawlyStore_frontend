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
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
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
    const [selectedSort, setSelectedSort] = useQueryState('sort', parseAsString.withOptions({ shallow: false }))


    const activeFilters = []
    if (selectedCategory !== 'all') {
        const category = categories.find(c => c.id === selectedCategory)
        if (category) activeFilters.push({ type: 'category', label: category.name, value: selectedCategory })
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
        <section className='py-8'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>Browse Stores</h2>
                    <p className='text-muted-foreground mt-2'>
                        Browse our collection of {categories.find(c => c.id === selectedCategory)?.count || 1247} stores
                    </p>
                </div>

                {/* Horizontal Filter Bar */}
                <div className='mb-6 space-y-4'>
                    {/* Search and Sort Row     */}
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                        {/* Search */}
                        <div className='relative max-w-md flex-1'>
                            <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                            <Input
                                placeholder='Search products...'
                                value={searchQuery || ''}
                                onChange={e => setSearchQuery(e.target.value, {
                                    // Send immediate update if resetting, otherwise debounce at 500ms
                                    limitUrlUpdates: e.target.value === '' ? undefined : debounce(1000)
                                })}
                                className='pl-10'
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className='flex justify-center gap-4'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='outline' className='w-full cursor-pointer sm:w-auto'>
                                        <SlidersHorizontal className='me-2 size-4' />
                                        Sort: {sortOptions.find(s => s.id === selectedSort)?.label}
                                        <ChevronDown className='ms-2 size-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end' className='w-56'>
                                    {sortOptions.map(option => (
                                        <DropdownMenuItem
                                            key={option.id}
                                            onClick={() => setSelectedSort(option.id)}
                                            className={selectedSort === option.id ? 'bg-accent' : ''}
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* View Mode Toggle */}
                            <div className='flex items-center justify-end mb-6'>
                                <div className='flex items-center gap-1 bg-muted rounded-lg p-1'>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => setViewMode('grid')}
                                        className={cn(
                                            'cursor-pointer h-8 px-3',
                                            viewMode === 'grid' && 'bg-background shadow-sm'
                                        )}
                                    >
                                        <LayoutGrid className='size-4' />
                                        <span className='sr-only'>Grid view</span>
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => setViewMode('list')}
                                        className={cn(
                                            'cursor-pointer h-8 px-3',
                                            viewMode === 'list' && 'bg-background shadow-sm'
                                        )}
                                    >
                                        <List className='size-4' />
                                        <span className='sr-only'>List view</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category and Price Filter Row */}
                    <div className='flex flex-wrap gap-3'>
                        {/* Category Dropdown */}
                        <Suspense fallback={<div>Loading categories...</div>}>
                            <CategoriesFilter categoriesResponsePromise={categoriesResponsePromise} selectedCategory={selectedCategory || 'all'} setSelectedCategory={setSelectedCategory} />
                        </Suspense>
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className='flex flex-wrap items-center gap-2'>
                            <span className='text-muted-foreground text-sm font-medium'>Active filters:</span>
                            {activeFilters.map((filter, index) => (
                                <Badge key={index} variant='secondary'>
                                    {filter.label}
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        className='h-auto cursor-pointer !p-1 text-inherit'
                                        onClick={() => clearFilter(filter.type)}
                                    >
                                        <X className='size-3' />
                                    </Button>
                                </Badge>
                            ))}
                            <DropdownMenuSeparator className='mx-2' />
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={clearAllFilters}
                                className='text-muted-foreground h-auto cursor-pointer p-1.5 text-xs'
                            >
                                Clear all
                            </Button>
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                {/* <div className='bg-muted/50 rounded-lg border p-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <span className='text-sm font-medium'>
                                Showing {categories.find(c => c.id === selectedCategory)?.count || 1247} results
                            </span>
                            {searchQuery && <span className='text-muted-foreground text-sm'>for "{searchQuery}"</span>}
                        </div>
                        <div className='text-muted-foreground text-xs'>
                            Sorted by {sortOptions.find(s => s.id === selectedSort)?.label}
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}