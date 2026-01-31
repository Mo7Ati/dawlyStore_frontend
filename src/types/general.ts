export type Response<T> = {
    data: T;
    message: string;
    status: string;
    extra: any;
}

export type ProductBase = {
    id: string;
    name: string;
    description: string;
    price: number;
    compare_price: number;
    discount_percentage: number;
    image_url: URL;
    rating: number;
    store_id: string;
    store_name: string;
}

export interface Rating {
    value: string
    count: string
}


export type Category = {
    id: string;
    name: string;
    description: string;
}

export type StoreCategory = {
    id: string;
    name: string;
    description: string;
    image_url: URL;
}