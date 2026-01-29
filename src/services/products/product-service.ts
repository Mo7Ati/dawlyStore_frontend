import { Product } from "@/types/product"
import api from "@/lib/api"
import { Response } from "@/types/general"

export const getProduct = async (id: string): Promise<Response<Product>> => {
    const response = await api.get(`/products/${id}`)
    return response.data
}