import { Category, Rating, StoreCategory } from "./general"
import { Store } from "./store"

export interface Product {
    id: string
    name: string
    description: string | null
    keywords: string[] | string | null

    price: number
    compare_price: number | null
    discount_percentage: number | null

    store_id: string
    category_id: string | null

    is_active: boolean
    is_accepted: boolean

    image_url: string
    quantity: number

    rating: Rating
    trending: boolean

    created_at: string | null
    updated_at: string | null

    store: Store
    category: Category
    additions?: Addition[]
    options?: Option[]
    store_category?: StoreCategory
}

export type Addition = {
    id: string;
    name: string;
    price: number;
}

export type Option = {
    id: string;
    name: string;
    price: number;
}