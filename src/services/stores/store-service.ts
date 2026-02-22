import api from "@/lib/api"
import { Response } from "@/types/general"
import { StoreCategory } from "@/types/general";
import { Store, StoreFilters, StoresPaginationMeta } from "@/types/store";

export type StoresResponse = Response<Store[]> & {
    extra: StoresPaginationMeta;
}

export const getStores = async (filters?: StoreFilters): Promise<StoresResponse> => {
    const params = new URLSearchParams();

    if (filters?.search) {
        params.append('search', filters.search);
    }
    if (filters?.category && filters.category !== 'all') {
        params.append('category', filters.category);
    }
    if (filters?.rating) {
        params.append('rating', filters.rating.toString());
    }
    if (filters?.status && filters.status !== 'all') {
        params.append('status', filters.status);
    }
    if (filters?.sort) {
        params.append('sort', filters.sort);
    }
    if (filters?.page) {
        params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
        params.append('limit', filters.limit.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `/stores?${queryString}` : '/stores';

    const response = await api.get(url);
    return response.data;
}

export const getStore = async (slug: string, filters: any): Promise<Response<Store>> => {
    const response = await api.get(`/stores/${slug}`, { params: filters });
    return response.data;
}

// Available categories for filter options
export const getStoreCategories = async (): Promise<Response<StoreCategory[]>> => {
    const response = await api.get('/store-categories');
    return response.data;
}