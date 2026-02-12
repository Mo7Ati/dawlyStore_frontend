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
    image: string;
}

export type CTASectionData = {
    title: string;
    description: string;
    image_url: URL;
}

export type FeaturesSectionData = {
    icon?: string;
    title: string;
    description: string;
}
