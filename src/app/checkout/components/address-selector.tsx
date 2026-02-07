"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Address, CreateAddressData } from "@/types/address";
import {
  getAddresses,
  createAddress,
  deleteAddress,
} from "@/services/address/address-service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddressSelectorProps {
  selectedAddressId: number | null;
  onSelect: (addressId: number | null) => void;
}

function formatLocation(address: Address): string {
  const loc = address.location;
  const parts = [
    loc.street,
    loc.buildingNumber,
    loc.city,
    loc.state,
    loc.country,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : address.name;
}

export function AddressSelector({
  selectedAddressId,
  onSelect,
}: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    buildingNumber: "",
    country: "",
  });

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAddresses();
      const list = response.data ?? [];
      setAddresses(list);
      if (list.length > 0) {
        onSelect(list[0].id);
      }
    } catch {
      toast.error("Failed to load addresses");
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, [onSelect]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleCreateAddress = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter an address name");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: CreateAddressData = {
        name: formData.name.trim(),
        location: {
          street: formData.street.trim() || undefined,
          city: formData.city.trim() || undefined,
          state: formData.state.trim() || undefined,
          country: formData.country.trim() || undefined,
          buildingNumber: formData.buildingNumber.trim() || undefined,
        },
      };
      const response = await createAddress(payload);
      const newAddress = response.data;
      if (newAddress) {
        setAddresses((prev) => [...prev, newAddress]);
        onSelect(newAddress.id);
      }
      setIsDialogOpen(false);
      resetForm();
      toast.success("Address added");
    } catch {
      toast.error("Failed to add address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAddress = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      if (selectedAddressId === id) {
        const remaining = addresses.filter((a) => a.id !== id);
        onSelect(remaining.length > 0 ? remaining[0].id : null);
      }
      toast.success("Address removed");
    } catch {
      toast.error("Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  };

  function resetForm() {
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      buildingNumber: "",
      country: "",
    });
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center gap-2 py-10 sm:py-12">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Loading addresses...
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
            <h3 className="text-base font-semibold sm:text-lg">
              Delivery address
            </h3>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add address</DialogTitle>
                <DialogDescription>
                  Add a delivery address. Name is required.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2 sm:py-4">
                <div className="grid gap-2">
                  <Label htmlFor="addr-name">Address name</Label>
                  <Input
                    id="addr-name"
                    placeholder="e.g. Home, Work"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addr-street">Street</Label>
                  <Input
                    id="addr-street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, street: e.target.value }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="addr-building">Building no.</Label>
                    <Input
                      id="addr-building"
                      placeholder="No."
                      value={formData.buildingNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          buildingNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="addr-city">City</Label>
                    <Input
                      id="addr-city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, city: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="addr-state">State</Label>
                    <Input
                      id="addr-state"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, state: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="addr-country">Country</Label>
                    <Input
                      id="addr-country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  onClick={handleCreateAddress}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save address"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {addresses.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center sm:p-8">
            <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />
            <p className="text-sm text-muted-foreground">
              No saved addresses. Add one to continue.
            </p>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddressId?.toString() ?? ""}
            onValueChange={(value) => onSelect(value ? Number(value) : null)}
            className="space-y-2 sm:space-y-3"
          >
            {addresses.map((address) => (
              <label
                key={address.id}
                htmlFor={`address-${address.id}`}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 sm:gap-4 sm:p-4",
                  selectedAddressId === address.id &&
                    "border-primary bg-primary/5"
                )}
              >
                <RadioGroupItem
                  value={address.id.toString()}
                  id={`address-${address.id}`}
                  className="mt-0.5 shrink-0"
                />
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-medium leading-tight">{address.name}</p>
                  <p className="text-sm text-muted-foreground wrap-break-word">
                    {formatLocation(address)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={(e) => handleDeleteAddress(e, address.id)}
                  disabled={deletingId === address.id}
                  aria-label="Delete address"
                >
                  {deletingId === address.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </label>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
}
