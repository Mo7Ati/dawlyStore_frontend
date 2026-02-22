import ProductOverview from "@/app/products/[slug]/components/product-overview"
import { getProduct } from "@/services/products/product-service"


export default async function ProductPage(props: PageProps<'/products/[slug]'>) {
    const { slug } = await props.params
    const productPromise = getProduct(slug)


    return <ProductOverview productPromise={productPromise} />
}
