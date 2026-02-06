export type Response<T> = {
    data: T;
    message: string;
    status: string;
    extra: any;
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