"use client";

import { ShoppingBag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StoreGroup } from '@/app/cart/components/store-group'
import { useCartSummary } from '@/stores/cart/use-cart'

const CartItems = () => {
    const summary = useCartSummary();
    return (
        <Card>
            <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <ShoppingBag className="h-5 w-5 shrink-0" />
                    Cart items
                </CardTitle>
                <CardDescription>
                    {summary.totalItems} items from {summary.storeCount} store
                    {summary.storeCount !== 1 ? "s" : ""}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
                {summary.storeGroups.map((group) => (
                    <StoreGroup
                        key={group.store_id}
                        group={group}
                        compact
                        showRemoveAll={true}
                    />
                ))}
            </CardContent>
        </Card>
    )
}

export default CartItems