import ProductCard from "@/components/home/product-card"
import { debounce, parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { Store } from "@/types/store"
import { Category } from "@/types/general"
import EmptyProducts from "./empty-products"
import { X } from "lucide-react"

interface ProductsGridProps {
    products: Product[]
    categories: Category[]
    store: Store
}



export default function ProductsGrid({ products, categories, store }: ProductsGridProps) {
    const [search, setSearch] = useQueryState('search', parseAsString.withOptions({ shallow: false }))
    const [category, setCategory] = useQueryState('category', parseAsString.withOptions({ shallow: false }))
    const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsInteger.withOptions({ shallow: false }))
    const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsInteger.withOptions({ shallow: false }))

    const hasActiveFilters = !!(search?.trim() || category || minPrice != null || maxPrice != null)
    const activeCategoryName = category ? categories.find((c) => c.slug === category)?.name : null

    const clearFilters = () => {
        setSearch(null)
        setCategory(null)
        setMinPrice(null)
        setMaxPrice(null)
    }

    return (
        <section className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-4">

                    {/* Filters */}
                    <div className="lg:col-span-1">
                        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                            <div className="px-6">

                                {/* Header */}
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="size-5"
                                        >
                                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                        </svg>
                                        <h3 className="font-semibold">Filters</h3>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="mb-6">
                                    <Label className="mb-2 block text-sm font-medium">
                                        Search
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={search || ''}
                                            onChange={(e) => setSearch(e.target.value, {
                                                limitUrlUpdates: e.target.value === '' ? undefined : debounce(1000)
                                            })}
                                            className="pl-10 h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                            placeholder="Search products..."
                                        />
                                    </div>
                                </div>

                                <hr className="mb-6" />

                                {/* Categories */}
                                <div className="mb-6">
                                    <Label htmlFor="categories" className="mb-3 block text-sm font-medium">
                                        Categories
                                    </Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.map((cat) => (
                                            <Button
                                                key={cat.id}
                                                title={cat.name}
                                                className="min-w-0 rounded-md border p-2 text-xs hover:bg-accent text-left cursor-pointer truncate"
                                                onClick={() => setCategory(cat.slug)}
                                                variant={category === cat.slug ? "default" : "outline"}
                                            >
                                                <span className="truncate">{cat.name}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <hr className="mb-6" />

                                {/* Price Range */}
                                <div className="mb-6">
                                    <Label className="mb-3 block text-sm font-medium">
                                        Price Range
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            className="h-9 w-full rounded-md border px-3 text-sm"
                                            value={minPrice ?? ''}
                                            onChange={(e) => {
                                                const v = e.target.value
                                                if (v === '') {
                                                    setMinPrice(null)
                                                } else {
                                                    const n = Number(v)
                                                    if (!Number.isNaN(n)) setMinPrice(n, { limitUrlUpdates: debounce(1000) })
                                                }
                                            }}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            className="h-9 w-full rounded-md border px-3 text-sm"
                                            value={maxPrice ?? ''}
                                            onChange={(e) => {
                                                const v = e.target.value
                                                if (v === '') {
                                                    setMaxPrice(null)
                                                } else {
                                                    const n = Number(v)
                                                    if (!Number.isNaN(n)) setMaxPrice(n, { limitUrlUpdates: debounce(1000) })
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-3">
                        {/* Active filters + Clear */}
                        {hasActiveFilters && (
                            <div className="mb-6 flex flex-wrap items-center gap-2">
                                <span className="text-muted-foreground text-sm">Active Filters:</span>
                                {search?.trim() && (
                                    <span className="bg-muted inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium">
                                        Search: &quot;{search}&quot;
                                        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground" onClick={() => setSearch(null)}>
                                            <X className="size-3" />
                                        </Button>
                                    </span>
                                )}
                                {activeCategoryName && (
                                    <span className="bg-muted inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium">
                                        Category: {activeCategoryName}
                                        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground" onClick={() => setCategory(null)}>
                                            <X className="size-3" />
                                        </Button>
                                    </span>
                                )}
                                {minPrice != null && (
                                    <span className="bg-muted inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium">
                                        Min: {minPrice}
                                        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground" onClick={() => setMinPrice(null)}>
                                            <X className="size-3" />
                                        </Button>
                                    </span>
                                )}
                                {maxPrice != null && (
                                    <span className="bg-muted inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium">
                                        Max: {maxPrice}
                                        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground" onClick={() => setMaxPrice(null)}>
                                            <X className="size-3" />
                                        </Button>
                                    </span>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-muted-foreground hover:text-foreground"
                                    onClick={clearFilters}
                                >
                                    Clear all
                                </Button>
                            </div>
                        )}

                        {/* Grid or empty state */}
                        {products.length === 0 ? (
                            <EmptyProducts />
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        storeId={store.id}
                                        storeName={store.name}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}
