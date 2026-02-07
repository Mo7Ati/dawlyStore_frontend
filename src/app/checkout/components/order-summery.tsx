import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { useCartSummary } from '@/stores/cart/use-cart'

interface OrderSummeryProps {
    handleCheckout: () => void;
    selectedAddressId: number | null;
    state: string;
}

const OrderSummery = (
    {
        handleCheckout,
        selectedAddressId,
        state
    }: OrderSummeryProps) => {
    const summary = useCartSummary();
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
                <Card>
                    <CardHeader className="pb-2 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl">Order summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {summary.storeGroups.map((group) => (
                                <div
                                    key={group.store_id}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <span className="truncate text-muted-foreground pr-2">
                                        {group.storeName}
                                    </span>
                                    <span className="shrink-0 font-medium">
                                        ${group.subtotal.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Separator />

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${summary.grandTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Delivery</span>
                                <span className="text-green-600 dark:text-green-400">
                                    At payment
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>At payment</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <span className="text-base font-semibold sm:text-lg">
                                Estimated total
                            </span>
                            <span className="text-xl font-bold text-primary sm:text-2xl">
                                ${summary.grandTotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>
                                Final amount including delivery and tax will be confirmed on
                                the payment page.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 pt-4">
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleCheckout}
                            disabled={!selectedAddressId || state === "processing"}
                        >
                            {state === "processing" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Redirecting…
                                </>
                            ) : (
                                <>
                                    Proceed to payment
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                        {!selectedAddressId && (
                            <p className="text-center text-xs text-muted-foreground">
                                Select a delivery address to continue
                            </p>
                        )}
                        <Button variant="ghost" className="w-full" asChild>
                            <Link href="/cart">Edit cart</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default OrderSummery