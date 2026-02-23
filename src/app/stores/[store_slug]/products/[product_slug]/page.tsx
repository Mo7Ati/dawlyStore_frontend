import { getProduct } from "@/services/products/product-service"
import ProductOverview from "./components/product-overview"


export default async function ProductPage(props: PageProps<'/stores/[store_slug]/products/[product_slug]'>) {
    const { store_slug, product_slug } = await props.params
    const productPromise = getProduct(store_slug, product_slug)


    return <ProductOverview productPromise={productPromise} />
}
