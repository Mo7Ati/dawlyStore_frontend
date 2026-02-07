'use client'

import { useCartHydrated, useCartSummary } from '@/stores/cart/use-cart'
import { CartSkeleton } from './components/cart-skeleton'
import CartSummary from './components/cart-summery'
import { CartEmpty } from './components/cart-empty'
import CartItems from './components/cart-items'

export default function ShoppingCart() {
  const summery = useCartSummary();
  const hydrated = useCartHydrated();

  if (!hydrated) {
    return <CartSkeleton />;
  }

  return (
    <div className='container mx-auto max-w-7xl px-4 py-8'>
      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='flex-1 space-y-6'>
          {/* Cart Items */}
          {summery.isEmpty ? (
            <CartEmpty />
          ) : (
            <CartItems />
          )}
        </div>

        {/* Order Summary */}
        <CartSummary />
      </div>
    </div>
  )
}