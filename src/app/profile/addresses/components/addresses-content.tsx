import type { Response } from "@/types/general";
import type { Address } from "@/types/address";
import { AddressesClient } from "./addresses-client";

type AddressesContentProps = {
  promise: Promise<Response<Address[]>>;
};

export async function AddressesContent({ promise }: AddressesContentProps) {
  const { data: addresses } = await promise;
  return <AddressesClient initialAddresses={addresses} />;
}
