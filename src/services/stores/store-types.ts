import { ProductBase } from "@/types/general";

export type StoreStatus = 'open' | 'closed';
export type ViewMode = 'grid' | 'list'

export type StoreBase = {
    id: string;
    image_url: URL;
    name: string;
    description: string | null;
    address: string;
    keywords: string[];
    social_media: any[];
    phone: string;
    delivery_time: number;
    status: StoreStatus;
    rating: number;
    category_name: string;
    products_count: number;
}

export type StoreOverview = StoreBase & {
    categories: Category[];
    products: Record<string, ProductBase[]>; // category name as key, products as value
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

export type Category = {
    id: string;
    name: string;
    description: string;
}



