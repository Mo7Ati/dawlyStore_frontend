import { Product } from "@/types/product"
import api from "@/lib/api"
import { Response } from "@/types/general"

export const getProduct = async (store_slug: string, product_slug: string): Promise<Response<Product>> => {
    const response = await api.get(`/stores/${store_slug}/products/${product_slug}`)
    return response.data
}