"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { ArrowLeft, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useCart,
  useCartSummary,
  useCartHydrated,
} from "@/stores/cart/use-cart";
import { CartEmpty } from "@/app/cart/components/cart-empty";
import { initiateCheckout } from "@/services/checkout/checkout-service";
import { AddressSelector } from "@/app/checkout/components/address-selector";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import SignInRequired from "./components/sign-in-required";
import CartItems from "../cart/components/cart-items";
import OrderSummery from "./components/order-summery";


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
  const { customer, isCustomerLoading: isAuthLoading } = useAuth();

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
      <div className="container mx-auto flex max-w-4xl flex-col items-center justify-center gap-3 px-4 py-20 sm:flex-row sm:gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground sm:mr-2" />
        <span className="text-muted-foreground">Loading checkout...</span>
      </div>
    );
  }

  // Empty cart only after hydration
  if (isEmpty) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <CartEmpty />
      </div>
    );
  }

  // Requires login
  if (state === "requires_login") {
    return <SignInRequired />;
  }

  // Ready: show checkout UI
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 pb-24 sm:py-8 sm:pb-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-2">
        <Button variant="ghost" size="icon" className="-ml-2 w-fit" asChild>
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
          <AlertCircle className="h-4 w-4 shrink-0" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="flex-1 min-w-0">{errorMessage}</span>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto shrink-0"
              onClick={() => setState("ready")}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left: Address + order items — order-2 on mobile so summary appears first */}
        <div className="order-2 space-y-6 lg:order-1 lg:col-span-2">
          <AddressSelector
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
          />

          <CartItems />
        </div>

        {/* Right: Order summary (sticky on desktop, first on mobile) */}
        <OrderSummery handleCheckout={handleCheckout} selectedAddressId={selectedAddressId} state={state} />
      </div>

      {/* Mobile sticky bottom bar — keeps CTA visible while scrolling */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] backdrop-blur supports-backdrop-filter:bg-background/80 lg:hidden">
        <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Estimated total</p>
            <p className="text-lg font-bold text-primary">${summary.grandTotal.toFixed(2)}</p>
          </div>
          <Button
            className="min-w-[140px] shrink-0"
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
        </div>
      </div>
    </div>
  );
}
