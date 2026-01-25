import api from "@/lib/api"
import { Response } from "@/types/general"
import { Store } from "@/types/store"

export const getStores = async (): Promise<Response<Store[]>> => {
    const response = await api.get('/stores')
    return response.data
}