import ProductOverview from "@/app/products/[id]/components/product-overview"
import { getProduct } from "@/services/products/product-service"


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const productPromise = getProduct(id)

    return <ProductOverview productPromise={productPromise} />
}
