export type Product = {
    id: number;
    store_category: {
        id: string;
        name: string;
    };
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
    price: number;
    compare_price?: number | null;
    discount_percentage?: number | null;
    name: string;
    description?: string | null;
    image_url: URL;
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
