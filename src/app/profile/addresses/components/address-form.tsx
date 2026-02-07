"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateAddressData } from "@/types/address";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const addressFormSchema = z.object({
  name: z.string().min(1, "Address name is required"),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  buildingNumber: z.string().optional(),
  country: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

function toFormValues(data?: CreateAddressData | null): AddressFormValues {
  if (!data?.location) {
    return { name: "", street: "", city: "", state: "", buildingNumber: "", country: "" };
  }
  const loc = data.location;
  return {
    name: data.name,
    street: loc.street ?? "",
    city: loc.city ?? "",
    state: loc.state ?? "",
    buildingNumber: loc.buildingNumber ?? "",
    country: loc.country ?? "",
  };
}

function toCreateAddressData(values: AddressFormValues): CreateAddressData {
  return {
    name: values.name,
    location: {
      street: values.street || undefined,
      city: values.city || undefined,
      state: values.state || undefined,
      country: values.country || undefined,
      buildingNumber: values.buildingNumber || undefined,
    },
  };
}

interface AddressFormProps {
  defaultValues?: CreateAddressData | null;
  onSubmit: (data: CreateAddressData) => void | Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
}

export function AddressForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitLabel = "Save address",
  onCancel,
}: AddressFormProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: toFormValues(defaultValues),
  });

  async function handleSubmit(values: AddressFormValues) {
    await onSubmit(toCreateAddressData(values));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Home, Work" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Street address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { toFormValues, toCreateAddressData };
