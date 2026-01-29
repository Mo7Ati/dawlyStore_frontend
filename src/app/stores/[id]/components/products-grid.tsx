import { ProductBase } from "@/types/general"
import { Category } from "@/services/stores/store-types"
import StoreProductCard from "./store-product-card"
import ProductCard from "@/components/home/product-card"

interface ProductsGridProps {
    products: Record<string, ProductBase[]>
    categories: Category[]
}

export default function ProductsGrid({ products, categories }: ProductsGridProps) {
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
                                    <label className="mb-2 block text-sm font-medium">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="pl-10 h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                            placeholder="Search products..."
                                        />
                                    </div>
                                </div>

                                <hr className="mb-6" />

                                {/* Categories */}
                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium">
                                        Categories
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                className="rounded-md border p-2 text-xs hover:bg-accent text-left cursor-pointer"
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <hr className="mb-6" />

                                {/* Price Range */}
                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium">
                                        Price Range
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="h-9 w-full rounded-md border px-3 text-sm"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="h-9 w-full rounded-md border px-3 text-sm"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-3">
                        {/* <div className="bg-card mb-6 rounded-xl border py-6 shadow-sm">
                            <div className="px-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Product Results</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Showing all products
                                    </p>
                                </div>
                                <div className="text-end">
                                    <div className="text-lg font-bold">1,247</div>
                                    <div className="text-xs text-muted-foreground">
                                        products found
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                Object.entries(products).map(([category, products]) => (
                                    <>
                                        <div
                                            key={category}
                                            className="bg-card rounded-xl border shadow-sm flex flex-col items-center py-4"
                                        >
                                            <div className="px-4">
                                                <ProductCard product={products[0]} />
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
