"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

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

          <CartItems />
        </div>

        {/* Right: Order summary (sticky on desktop) */}
        <OrderSummery handleCheckout={handleCheckout} selectedAddressId={selectedAddressId} state={state} />
      </div>
    </div>
  );
}
