import { Rating, StoreCategory, Category } from "./general"
import { Product } from "./product"

export type StoreStatus = 'open' | 'closed';
export type ViewMode = 'grid' | 'list'

export type Store = {
    id: string
    name: string
    address: string | null
    description: string | null

    keywords: string[] | string | null
    social_media: Record<string, string> | null

    email: string | null
    phone: string | null

    category_id: string | null
    delivery_time: string | null

    delivery_area_polygon: unknown | null
    is_active: boolean

    rating: Rating

    created_at: string | null
    image_url: string

    category?: StoreCategory
    products?: Product[]
    categories?: Category[]
}

export type StoresPaginationMeta = {
    total: number;
    page: number;
    per_page: number;
    has_more: boolean;
}

export type StoreFilters = {
    search?: string;
    category?: string;
    rating?: number;
    status?: StoreStatus | 'all';
    sort?: 'rating' | 'newest' | 'alphabetical';
    page?: number;
    limit?: number;
}


