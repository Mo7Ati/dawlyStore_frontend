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
    image_url: URL;
    rating: number;
}
