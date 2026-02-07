"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Loader2,
  LogIn,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  useCart,
  useCartSummary,
  useCartHydrated,
} from "@/stores/cart/use-cart";
import { StoreGroup } from "@/app/cart/components/store-group";
import { CartEmpty } from "@/app/cart/components/cart-empty";
import { initiateCheckout } from "@/services/checkout/checkout-service";
import { AddressSelector } from "@/app/checkout/components/address-selector";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

type CheckoutState =
  | "loading"
  | "checking_auth"
  | "requires_login"
  | "ready"
  | "processing"
  | "error";

export default function CheckoutPage() {
  const hydrated = useCartHydrated();
  const summary = useCartSummary();
  const isEmpty = summary.isEmpty;
  const { getCheckoutItems } = useCart();
  const { customer, isLoading: isAuthLoading } = useAuth();

  const [state, setState] = useState<CheckoutState>("loading");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Wait for cart hydration before deciding empty vs has items
  useEffect(() => {
    if (!hydrated) {
      setState("loading");
      return;
    }
    if (isAuthLoading) {
      setState("checking_auth");
      return;
    }
    if (!customer) {
      setState("requires_login");
      return;
    }
    setState("ready");
  }, [hydrated, isAuthLoading, customer]);

  const handleCheckout = async () => {
    if (isEmpty || !selectedAddressId) return;

    setState("processing");
    setErrorMessage("");

    try {
      const items = getCheckoutItems();
      const response = await initiateCheckout(items, selectedAddressId);
      window.location.href = response.data.checkout_url;
    } catch {
      setErrorMessage("Failed to create checkout session. Please try again.");
      setState("error");
      toast.error("Checkout failed", {
        description: "Please try again or contact support.",
      });
    }
  };

  // Show loading until cart is hydrated (avoids flash of empty cart)
  if (!hydrated || state === "loading" || state === "checking_auth") {
    return (
      <div className="container mx-auto flex max-w-4xl items-center justify-center px-4 py-20">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-muted-foreground" />
        <span className="text-muted-foreground">Loading checkout...</span>
      </div>
    );
  }

  // Empty cart only after hydration
  if (isEmpty) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <CartEmpty
          title="Your cart is empty"
          description="Add some items to your cart before checking out."
        />
      </div>
    );
  }

  // Requires login
  if (state === "requires_login") {
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
                <LogIn className="h-4 w-4" />
                Log in to continue
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup?redirect=/checkout">Create an account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Ready: show checkout UI
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <Button variant="ghost" size="icon" className="mb-2 sm:mb-0" asChild>
          <Link href="/cart" aria-label="Back to cart">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Checkout</h1>
          <p className="mt-0.5 text-sm text-muted-foreground sm:text-base">
            Choose your delivery address and proceed to payment
          </p>
        </div>
      </header>

      {state === "error" && (
        <Alert variant="destructive" className="mb-4 sm:mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center gap-2">
            <span className="flex-1">{errorMessage}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setState("ready")}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left: Address + order items */}
        <div className="space-y-6 lg:col-span-2">
          <AddressSelector
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
          />

          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <ShoppingBag className="h-5 w-5 shrink-0" />
                Order items
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
                  showRemoveAll={false}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Order summary (sticky on desktop) */}
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
      </div>
    </div>
  );
}
