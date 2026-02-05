import ProductOverview from "@/app/products/[id]/components/product-overview"
import { getProduct } from "@/services/products/product-service"


export default async function ProductPage(props: PageProps<'/products/[id]'>) {
    const { id } = await props.params
    const productPromise = getProduct(id)
    

    return <ProductOverview productPromise={productPromise} />
}
