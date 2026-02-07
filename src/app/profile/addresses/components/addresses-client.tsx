"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Address } from "@/types/address";
import { CreateAddressData } from "@/types/address";
import {
  createAddress,
  editAddress,
  deleteAddress,
} from "@/services/address/address-service";
import { toast } from "sonner";
import { AddressForm } from "./address-form";



type AddressesClientProps = {
  initialAddresses: Address[];
};

export function AddressesClient({ initialAddresses }: AddressesClientProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const editingAddress = editingId
    ? initialAddresses.find((a) => a.id === editingId)
    : null;

  const handleCreate = async (data: CreateAddressData) => {
    setIsSubmitting(true);
    try {
      await createAddress(data);
      setIsCreateOpen(false);
      toast.success("Address added successfully");
      router.refresh();
    } catch {
      toast.error("Failed to add address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: CreateAddressData) => {
    if (!editingId || !editingAddress) return;
    setIsSubmitting(true);
    try {
      const fullData: Address = {
        ...editingAddress,
        name: data.name,
        location: data.location,
      };
      await editAddress(editingId, fullData);
      setEditingId(null);
      toast.success("Address updated successfully");
      router.refresh();
    } catch {
      toast.error("Failed to update address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId == null) return;
    setIsDeleting(true);
    try {
      await deleteAddress(deleteId);
      setDeleteId(null);
      toast.success("Address deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete address");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="w-full overflow-hidden">
        <CardHeader className="flex flex-col gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <CardTitle>Your addresses</CardTitle>
            <CardDescription>
              Add, edit, or remove delivery addresses.
            </CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <Button onClick={() => setIsCreateOpen(true)} className="shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Add address
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new address</DialogTitle>
                <DialogDescription>
                  Enter the address details. Name and zip code are required.
                </DialogDescription>
              </DialogHeader>
              <AddressForm
                key="create"
                onSubmit={handleCreate}
                isLoading={isSubmitting}
                submitLabel="Add address"
                onCancel={() => setIsCreateOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {initialAddresses.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <MapPin className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium">No saved addresses</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add an address to use at checkout.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => setIsCreateOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add address
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {initialAddresses.map((address) => (
                <li
                  key={address.id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-lg border p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm text-muted-foreground wrap-break-word">
                      {address.location.country}, {address.location.city}, {address.location.state}, {address.location.street}, {address.location.buildingNumber}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingId(address.id)}
                      aria-label="Edit address"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleteId(address.id)}
                      aria-label="Delete address"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={editingId !== null} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit address</DialogTitle>
            <DialogDescription>
              Update the address details.
            </DialogDescription>
          </DialogHeader>
          {editingAddress && (
            <AddressForm
              key={editingId}
              defaultValues={{
                name: editingAddress.name,
                location: editingAddress.location,
              }}
              onSubmit={handleEdit}
              isLoading={isSubmitting}
              submitLabel="Save changes"
              onCancel={() => setEditingId(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete address?</DialogTitle>
            <DialogDescription>
              This address will be removed. You can add it again later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
