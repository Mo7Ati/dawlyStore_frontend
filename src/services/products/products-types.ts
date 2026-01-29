
export type ProductBase = {
    id: string;
    name: string;
    description?: string | null;
    image_url: URL;
    rating: number;
    price: number;
    compare_price?: number | null;
    discount_percentage?: number | null;
}

export type ProductDetails = ProductBase & {
    store: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
    };
    rating: {
        value: number;
        count: number;
    }
    additions: {
        id: string;
        name: string;
        price: number;
    }[];
    options: {
        id: string;
        name: string;
        price: number;
    }[];
}
