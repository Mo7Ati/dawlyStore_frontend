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
    slug: string;
    name: string;
    description: string;
}

export type StoreCategory = {
    id: string;
    name: string;
    slug: string;
    stores_count: number;
    description: string;
    image: Media | null;
}

export type Media = {
    id: number | string;
    name: string;
    url: string;
    type: string;
    uuid: string;
    size: number;
    mime_type: string;
    file_name: string;
}