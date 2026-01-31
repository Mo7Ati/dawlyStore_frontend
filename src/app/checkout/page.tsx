"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LogIn,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useCart, useCartSummary, useIsCartEmpty } from "@/stores/cart/use-cart";
import { StoreGroup } from "@/app/cart/components/store-group";
import { CartEmpty } from "@/app/cart/components/cart-empty";
import {
  initiateCheckout,
  checkAuthForCheckout,
} from "@/services/checkout/checkout-service";
import {
  CheckoutResponse,
  CheckoutItemError,
  CheckoutSession,
} from "@/services/checkout/checkout-types";
import { toast } from "sonner";

type CheckoutState =
  | "loading"
  | "checking_auth"
  | "requires_login"
  | "validating"
  | "validation_error"
  | "ready"
  | "processing"
  | "success"
  | "error";

export default function CheckoutPage() {
  const router = useRouter();
  const summary = useCartSummary();
  const isEmpty = useIsCartEmpty();
  const { getCheckoutItems, clearCart, removeItem } = useCart();

  const [state, setState] = useState<CheckoutState>("loading");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [validationErrors, setValidationErrors] = useState<CheckoutItemError[]>([]);
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSession | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      setState("checking_auth");
      try {
        const { isAuthenticated: authStatus } = await checkAuthForCheckout();
        setIsAuthenticated(authStatus);

        if (!authStatus) {
          setState("requires_login");
        } else {
          setState("ready");
        }
      } catch {
        // If auth check fails, assume guest and proceed to login prompt
        setState("requires_login");
      }
    };

    if (!isEmpty) {
      checkAuth();
    } else {
      setState("loading");
    }
  }, [isEmpty]);

  const handleValidateAndCheckout = async () => {
    if (isEmpty) return;

    setState("validating");
    setValidationErrors([]);
    setErrorMessage("");

    try {
      const items = getCheckoutItems();
      const response: CheckoutResponse = await initiateCheckout(items);

      if (!response.success) {
        setValidationErrors(response.errors);
        setState("validation_error");
        toast.error("Some items need attention", {
          description: "Please review and fix the issues below.",
        });
      } else {
        setCheckoutSession(response.session);
        setState("ready");
        toast.success("Cart validated successfully!", {
          description: "Proceed to payment when ready.",
        });
      }
    } catch (error) {
      setErrorMessage("Failed to validate cart. Please try again.");
      setState("error");
      toast.error("Checkout failed", {
        description: "Please try again or contact support.",
      });
    }
  };

  const handleProceedToPayment = async () => {
    if (!checkoutSession) {
      await handleValidateAndCheckout();
      return;
    }

    setState("processing");

    // In a real app, this would redirect to payment gateway
    // For now, simulate a successful payment
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart on success
      clearCart();
      setState("success");

      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase.",
      });

      // Redirect to order confirmation
      setTimeout(() => {
        router.push("/orders");
      }, 3000);
    } catch {
      setState("error");
      setErrorMessage("Payment processing failed. Please try again.");
    }
  };

  const handleRemoveErrorItem = (productId: string, storeId: string) => {
    // Find and remove the item with the error
    const items = getCheckoutItems();
    const item = items.find(
      (i) => i.productId === productId && i.storeId === storeId
    );
    if (item) {
      removeItem(item.cartItemId);
      // Remove the error from the list
      setValidationErrors((prev) =>
        prev.filter(
          (e) => !(e.productId === productId && e.storeId === storeId)
        )
      );
      // If no more errors, go back to ready state
      if (validationErrors.length <= 1) {
        setState("ready");
      }
    }
  };

  const getErrorMessage = (error: CheckoutItemError): string => {
    switch (error.errorType) {
      case "PRICE_CHANGED":
        return `Price changed to $${error.newPrice?.toFixed(2)}`;
      case "OUT_OF_STOCK":
        return "Item is out of stock";
      case "INSUFFICIENT_STOCK":
        return `Only ${error.availableQuantity} available`;
      case "PRODUCT_NOT_FOUND":
        return "Product no longer exists";
      case "STORE_MISMATCH":
        return "Product no longer sold by this vendor";
      case "PRODUCT_UNAVAILABLE":
        return "Product is currently unavailable";
      case "OPTION_UNAVAILABLE":
        return "Selected option is no longer available";
      case "ADDITION_UNAVAILABLE":
        return "Selected addition is no longer available";
      default:
        return error.message;
    }
  };

  // Empty cart state
  if (isEmpty) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <CartEmpty
          title="Your cart is empty"
          description="Add some items to your cart before checking out."
        />
      </div>
    );
  }

  // Requires login state
  if (state === "requires_login") {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>

        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please log in to complete your purchase. Your cart will be saved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium">Your Cart</p>
              <p className="text-sm text-muted-foreground">
                {summary.totalItems} items from {summary.storeCount} store
                {summary.storeCount > 1 ? "s" : ""}
              </p>
              <p className="mt-1 text-lg font-semibold">
                ${summary.grandTotal.toFixed(2)}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full" size="lg" asChild>
              <Link href="/login?redirect=/checkout">
                <LogIn className="mr-2 h-4 w-4" />
                Log In to Continue
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup?redirect=/checkout">
                Create an Account
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Success state
  if (state === "success") {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Order Placed Successfully!</CardTitle>
            <CardDescription>
              Thank you for your purchase. You will receive a confirmation email
              shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Redirecting to your orders...
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/orders">View My Orders</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to cart</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>
          <p className="text-muted-foreground">
            Review your order and complete payment
          </p>
        </div>
      </div>

      {/* Validation Errors */}
      {state === "validation_error" && validationErrors.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Some items need attention</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-2">
              {validationErrors.map((error, index) => (
                <li
                  key={`${error.productId}-${error.storeId}-${index}`}
                  className="flex items-center justify-between rounded-md bg-destructive/10 p-2"
                >
                  <span>{getErrorMessage(error)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleRemoveErrorItem(error.productId, error.storeId)
                    }
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleValidateAndCheckout}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Validation
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Error State */}
      {state === "error" && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setState("ready")}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Order Items */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Items
              </CardTitle>
              <CardDescription>
                {summary.totalItems} items from {summary.storeCount} store
                {summary.storeCount > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {summary.storeGroups.map((group) => (
                <StoreGroup
                  key={group.storeId}
                  group={group}
                  compact
                  showRemoveAll={false}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Payment */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Vendor Breakdown */}
                <div className="space-y-2">
                  {summary.storeGroups.map((group) => (
                    <div
                      key={group.storeId}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {group.storeName}
                      </span>
                      <span>${group.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${summary.grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600">Calculated at payment</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at payment</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Estimated Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${summary.grandTotal.toFixed(2)}
                  </span>
                </div>

                {/* Price Disclaimer */}
                <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Final prices including delivery and taxes will be confirmed
                    after validation.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                {!checkoutSession ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleValidateAndCheckout}
                    disabled={state === "validating" || state === "processing"}
                  >
                    {state === "validating" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      <>
                        Validate & Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleProceedToPayment}
                    disabled={state === "processing"}
                  >
                    {state === "processing" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Purchase
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/cart">Edit Cart</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
