export type AddressLocation = {
  country?: string;
  city?: string;
  street?: string;
  buildingNumber?: string;
  state?: string;
};

export type Address = {
  id: number;
  name: string;
  customer_id: number;
  location: AddressLocation;
};

export type CreateAddressData = {
  name: string;
  location: AddressLocation;
};
