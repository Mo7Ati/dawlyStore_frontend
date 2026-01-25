import ProductOverview from "@/app/product/[id]/components/product-overview"
import { getProduct } from "@/services/product-service"


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const productPromise = getProduct(id)

    return <ProductOverview productPromise={productPromise} />
}
