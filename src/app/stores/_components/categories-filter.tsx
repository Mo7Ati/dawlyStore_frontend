'use client'
import { Button } from '@/components/ui/button'
import { use } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Response } from '@/types/general'
import { StoreCategory } from '@/types/store-category'


interface CategoriesFilterProps {
    categoriesResponsePromise: Promise<Response<StoreCategory[]>>
    selectedCategory: string
    setSelectedCategory: (category: string) => void
}

const CategoriesFilter = ({ categoriesResponsePromise, selectedCategory, setSelectedCategory }: CategoriesFilterProps) => {
    const { data: categories } = use(categoriesResponsePromise);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='cursor-pointer'>
                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                    <ChevronDown className='ms-2 size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                {categories.map(category => (
                    <DropdownMenuItem
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={selectedCategory === category.name ? 'bg-accent' : ''}
                    >
                        <div className='flex w-full items-center justify-between'>
                            <span>{category.name}</span>
                            <Badge variant='secondary' className='text-xs'>
                                {/* {category.count} - TODO: Add count */}
                            </Badge>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoriesFilter