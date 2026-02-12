import { Suspense } from "react";
import { getAddresses } from "@/services/address/address-service";
import { AddressesContent } from "./components/addresses-content";
import { AddressesFallback } from "./components/addresses-fallback";

// Addresses require auth; do not prerender at build time
export const dynamic = "force-dynamic";

export default function ProfileAddressesPage() {
  const addressesPromise = getAddresses();

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">Addresses</h1>
        <p className="text-muted-foreground text-sm">
          Manage your saved delivery addresses.
        </p>
      </div>
      <Suspense fallback={<AddressesFallback />}>
        <AddressesContent promise={addressesPromise} />
      </Suspense>
    </div>
  );
}
