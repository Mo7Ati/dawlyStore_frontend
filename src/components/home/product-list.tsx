import ProductCard from './product-card'
import { useIsMobile } from '@/hooks/use-mobile'
import { Product } from '@/types/product'

const ProductList = ({ data }: { data: Product[] }) => {
    const isMobile = useIsMobile();
    if (isMobile) {
        data = data.slice(0, 5);
    }
    return (
        <section className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 xl:grid-cols-4">
                {
                    data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </section>
    )
}

export default ProductList 