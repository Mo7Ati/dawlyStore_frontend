import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package } from 'lucide-react'
import { Product } from '@/types/product'
import ProductCard from '@/components/home/product-card'
import { Category } from '@/types/general'

interface CategoryTabsProps {
    categories: Category[]
    products: Record<string, Product[]>
}

const CategoryTabs = ({ categories, products }: CategoryTabsProps) => {
    if (categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <Package className="size-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Categories Available</h3>
                <p className="text-muted-foreground text-sm mt-1">
                    This store hasn't any products yet.
                </p>
            </div>
        )
    }

    const defaultCategory = categories[0]?.name || ''

    return (
        <Tabs defaultValue={defaultCategory} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-1 p-1">
                {categories.map((category) => {
                    const categoryProducts = products[category.name] || []
                    return (
                        <TabsTrigger
                            key={category.id}
                            value={category.name}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            {category.name}
                            <span className="ml-1.5 text-xs opacity-70">
                                ({categoryProducts.length})
                            </span>
                        </TabsTrigger>
                    )
                })}
            </TabsList>

            {categories.map((category) => {
                const categoryProducts = products[category.name] || []

                return (
                    <TabsContent key={category.id} value={category.name} className="mt-6">
                        {categoryProducts.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {categoryProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <Package className="size-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">No Products</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    No products available in this category yet.
                                </p>
                            </div>
                        )}
                    </TabsContent>
                )
            })}
        </Tabs>
    )
}

export default CategoryTabs
