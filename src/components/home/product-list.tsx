import ProductCard from './product-card'
import { useIsMobile } from '@/hooks/use-mobile'
import { Product } from '@/types/product'

interface ProductListProps {
    products: Product[],
    title: string,
    description: string,
}

const ProductList = ({ data }: { data: ProductListProps }) => {
    const isMobile = useIsMobile();
    if (isMobile) {
        data.products = data.products.slice(0, 5);
    }
    return (
        <section className="container mx-auto p-8">
            <header className='mb-16 text-center'>
                {data.title && <h2 className='text-3xl font-bold text-balance md:text-4xl'>{data.title}</h2>}
                {data.description && <p className='text-muted-foreground text-base text-pretty mt-4'>{data.description}</p>}
            </header>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {
                    data.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </section>
    )
}

export default ProductList 