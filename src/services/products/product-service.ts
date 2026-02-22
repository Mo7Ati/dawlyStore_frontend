import { Product } from "@/types/product"
import api from "@/lib/api"
import { Response } from "@/types/general"

export const getProduct = async (slug: string): Promise<Response<Product>> => {
    const response = await api.get(`/products/${slug}`)
    return response.data
}