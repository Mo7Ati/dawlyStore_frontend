'use client'

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const CartItemSkeleton = () => (
  <Card className="gap-0 overflow-hidden py-0">
    <div className="flex flex-col sm:flex-row">
      <Skeleton className="h-36 w-full shrink-0 sm:w-40 rounded-none" />
      <div className="flex-1 p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="size-8 shrink-0 rounded-md" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="h-4 w-6" />
            <Skeleton className="size-8 rounded-md" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
    <CardFooter className="bg-muted/20 border-t px-4 py-2">
      <Skeleton className="h-4 w-56" />
    </CardFooter>
  </Card>
)

export function CartSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 space-y-2 text-center">
        <Skeleton className="mx-auto h-9 w-64 sm:w-80" />
        <Skeleton className="mx-auto h-5 w-72" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>

        <div className="w-full space-y-4 lg:w-96">
          <Card className="sticky top-4 gap-0">
            <CardHeader className="pb-4">
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-7 w-20" />
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
              <div className="flex justify-center">
                <Skeleton className="h-4 w-48" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed py-4">
            <CardContent className="px-4">
              <div className="flex items-start gap-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}
