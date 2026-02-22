'use client'
import { Button } from '@/components/ui/button'
import { use } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Response } from '@/types/general'
import { StoreCategory } from '@/types/general'


interface CategoriesFilterProps {
    categoriesResponsePromise: Promise<Response<StoreCategory[]>>
    selectedCategory: string
    setSelectedCategory: (category: string) => void
}

const ALL_VALUE = 'all'
const ALL_LABEL = 'All'

const CategoriesFilter = ({ categoriesResponsePromise, selectedCategory, setSelectedCategory }: CategoriesFilterProps) => {
    const { data: categories } = use(categoriesResponsePromise);

    const displayLabel = selectedCategory === ALL_VALUE
        ? ALL_LABEL
        : (categories.find(c => c.name === selectedCategory)?.name ?? selectedCategory);

    console.log(categories);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='w-full cursor-pointer shrink-0 justify-between sm:w-auto sm:justify-normal'>
                    <span className='min-w-0 truncate'>Category: {displayLabel}</span>
                    <ChevronDown className='ms-2 size-4 shrink-0' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuItem
                    onClick={() => setSelectedCategory(ALL_VALUE)}
                    className={selectedCategory === ALL_VALUE ? 'bg-accent' : ''}
                >
                    {ALL_LABEL}
                </DropdownMenuItem>
                {categories.map(category => (
                    <DropdownMenuItem
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={selectedCategory === category.name ? 'bg-accent' : ''}
                    >
                        <div className='flex w-full items-center justify-between'>
                            <span>{category.name}</span>
                            <Badge variant='secondary' className='text-xs'>
                                {category.stores_count}
                            </Badge>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoriesFilter