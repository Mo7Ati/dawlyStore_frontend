'use client'

import { Trash2, Minus, Plus, ShoppingBag, Package, Shield, CreditCard, Store, MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCart, useCartHydrated, useCartSummary } from '@/stores/cart/use-cart'
import { useRouter } from 'next/navigation'
import { CartSkeleton } from './components/cart-skeleton'

export default function ShoppingCart() {
  const summery = useCartSummary();
  const { removeItem, incrementQuantity, decrementQuantity } = useCart();
  const router = useRouter();
  const hydrated = useCartHydrated();

  if (!hydrated) {
    return <CartSkeleton />;
  }


  return (
    <div className='container mx-auto max-w-7xl px-4 py-8'>
      <div className='mb-8 space-y-2 text-center'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Your Shopping Cart</h1>
        <p className='text-muted-foreground'>
          {summery.totalItems} {summery.totalItems === 1 ? 'item' : 'items'} in your cart •{' '}
          <span className='text-foreground font-semibold'>${summery.grandTotal.toFixed(2)}</span>
        </p>
      </div>

      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='flex-1 space-y-6'>
          {/* Cart Items */}
          {summery.isEmpty ? (
            <Card className='border-dashed'>
              <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
                <ShoppingBag className='text-muted-foreground/50 mb-4 size-12' />
                <h3 className='text-lg font-medium'>Your cart is empty</h3>
                <p className='text-muted-foreground mt-1 text-sm'>Add some items to get started</p>
                <Button className='mt-4 cursor-pointer' variant='outline'>
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            summery.items.map(item => (
              <Card
                key={item.cartItemId}
                className={cn('gap-0 overflow-hidden py-0', {
                  'opacity-50': false,
                })}
              >
                <div className='flex flex-col sm:flex-row'>
                  <div className='relative h-auto w-full sm:w-40'>
                    <img src={item.productImageUrl} alt={item.productName} className='h-36 w-full object-cover object-center' />
                  </div>

                  <div className='flex-1 p-4'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='text-foreground text-lg font-medium'>{item.productName}</h3>
                        <Link href={`/stores/${item.store_id}`}>
                          <p className='text-muted-foreground mt-1 text-sm'>{item.storeName}</p>
                        </Link>
                        <p className='text-muted-foreground mt-1 text-sm'>
                          {item.selected_options.map(option => option.name).join(', ')} {item.selected_additions.map(addition => addition.name).join(', ')}
                        </p>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-muted-foreground hover:bg-destructive/10 hover:text-destructive size-8 cursor-pointer'
                        onClick={() => removeItem(item.cartItemId)}
                      >
                        <Trash2 className='size-4' />
                      </Button>
                    </div>

                    <div className='mt-4 flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='outline'
                          size='icon'
                          className='size-8 cursor-pointer'
                          onClick={() => decrementQuantity(item.cartItemId)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className='size-3' />
                        </Button>
                        <span className='w-8 text-center text-sm font-medium'>{item.quantity}</span>
                        <Button
                          variant='outline'
                          size='icon'
                          className='size-8 cursor-pointer'
                          onClick={() => incrementQuantity(item.cartItemId)}
                        >
                          <Plus className='size-3' />
                        </Button>
                      </div>

                      <div className='text-end'>
                        <p className='text-lg font-semibold'>${(item.unitPrice * item.quantity).toFixed(2)}</p>
                        {item.comparePrice && item.comparePrice > item.unitPrice && (
                          <p className='text-muted-foreground text-xs line-through'>${item.comparePrice.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <CardFooter className='bg-muted/20 border-t px-4 !py-2'>
                  <div className='text-muted-foreground flex items-center text-sm'>
                    <Package className='me-2 size-4' />
                    <span>Estimated delivery: 12-14 business days</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className='w-full space-y-4 lg:w-96'>
          <Card className='sticky top-4 gap-0'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-xl'>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span>${summery.grandTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span className={summery.grandTotal >= 500 ? 'text-green-600' : ''}>
                    {summery.grandTotal >= 500 ? 'Free' : `$${summery.grandTotal.toFixed(2)}`}
                  </span>
                </div>
                {/* {savings > 0 && (
                  <div className='flex justify-between text-sm font-medium'>
                    <span>You Save</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )} */}
              </div>

              <Separator className='my-2' />

              <div className='flex items-center justify-between text-base font-medium'>
                <span>Total</span>
                <div className='text-end'>
                  <p className='text-xl font-bold'>${summery.grandTotal.toFixed(2)}</p>
                  <p className='text-muted-foreground text-xs'>including VAT, if applicable</p>
                </div>
              </div>

              <Button
                size='lg'
                className='mt-4 w-full cursor-pointer text-base font-medium'
                disabled={summery.items.length === 0}
                onClick={() => router.push('/checkout')}
              >
                <ShoppingBag className='me-2 size-5' />
                Proceed to Checkout
              </Button>

              <div className='text-muted-foreground flex items-center justify-center gap-2 text-xs'>
                <CreditCard className='size-3.5' />
                <span>Secure payment with SSL encryption</span>
              </div>
            </CardContent>
          </Card>

          <Card className='border-dashed py-4'>
            <CardContent className='px-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-600'>
                  <Shield className='size-5' />
                </div>
                <div>
                  <h4 className='font-medium'>Secure Checkout</h4>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant='outline' className='w-full cursor-pointer'>
            <Store className='me-2 size-4' />
            Continue Shopping
            <MoveRight className='ms-2 size-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}