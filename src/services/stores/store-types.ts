import { ProductBase } from "@/types/general";

export type StoreStatus = 'open' | 'closed';
export type ViewMode = 'grid' | 'list'

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


