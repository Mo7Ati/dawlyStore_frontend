import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { useCartSummary } from "@/stores/cart/use-cart";
import Link from "next/link";
import { ArrowLeft, LogIn, User } from "lucide-react";

const SignInRequired = () => {
    const summary = useCartSummary();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
            <div className="mb-6 sm:mb-8">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/cart" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to cart
                    </Link>
                </Button>
            </div>

            <Card className="mx-auto max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 sm:h-16 sm:w-16">
                        <LogIn className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
                    </div>
                    <CardTitle>Login required</CardTitle>
                    <CardDescription>
                        Sign in to complete your purchase. Your cart will be saved.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                        <p className="mb-2 text-sm font-medium">Your cart</p>
                        <p className="text-sm text-muted-foreground">
                            {summary.totalItems} items from {summary.storeCount} store
                            {summary.storeCount !== 1 ? "s" : ""}
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                            ${summary.grandTotal.toFixed(2)}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full" size="lg" asChild>
                        <Link href="/login?redirect=/checkout" className="flex items-center justify-center gap-2">
                            <User className="h-4 w-4" />
                            Log in to continue
                        </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/register?redirect=/checkout">Create an account</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignInRequired