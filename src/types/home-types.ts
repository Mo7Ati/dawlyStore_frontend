export type Section = {
    id: number;
    type: SectionType;
    data: any;
    order: number;
    created_at: string;
    updated_at: string;
}

type SectionType = {
    HERO: 'hero',
    FEATURES: 'features',
    STORES: 'stores',
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    CTA: 'cta',
}

export type HeroSectionData = {
    title: string;
    description: string;
}

export type CategoryListSectionData = {
    id: number;
    name: string;
    image_url: URL;
}

export type CTASectionData = {
    title: string;
    description: string;
    image_url: URL;
}

export type StoreListSectionData = {
    id: number;
    name: string;
    description: string;
    image_url: URL;
    category_name: string;
    rating: number;
    products_count: number;
    created_at: string;
    updated_at: string;
}

export type FeaturesSectionData = {
    icon?: string;
    title: string;
    description: string;
}

export type ProductListSectionData = {
    id: number;
    name: string;
    description?: string | null;
    image_url: URL;
    rating: number;
    price: number;
    store_name: string;
    trending: boolean;
    compare_price?: number | null;
    discount_percentage?: number | null;
}
