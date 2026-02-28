'use client'

import type { Response } from "@/types/general";
import type { Address } from "@/types/address";
import { AddressesClient } from "./addresses-client";
import { use } from "react";

type AddressesContentProps = {
  promise: Promise<Response<Address[]>>;
};

export function AddressesContent({ promise }: AddressesContentProps) {
  const { data: addresses } = use(promise);

  return <AddressesClient initialAddresses={addresses} />;
}
