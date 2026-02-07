"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import { User, Mail, Phone, Loader2 } from "lucide-react";
import { ProfileSkeleton } from "./profile-skeleton";
import { useAuth } from "@/contexts/auth-context";
import { updateProfile } from "@/services/profile/profile-service";

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

const basicInfoSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
});

const ProfileForm: React.FC = () => {
    const { customer, isLoading, getCustomer } = useAuth();
    const router = useRouter();

    const form = useForm<BasicInfoValues>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    // Redirect if not logged in (client-side)
    useEffect(() => {
        if (!isLoading && customer === null) {
            router.push("/login");
        }
    }, [isLoading, customer, router]);

    // Reset form when customer data is loaded
    useEffect(() => {
        if (customer) {
            form.reset({
                name: customer.name || "",
                email: customer.email || "",
                phone: customer.phone || "",
            });
        }
    }, [customer, form]);

    // Loading skeleton while fetching customer
    if (isLoading || !customer) {
        return <ProfileSkeleton />;
    }

    const onSubmit = async (data: BasicInfoValues) => {
        try {
            // Optional: only send changed fields
            const changedData: Partial<BasicInfoValues> = {};
            if (data.name !== customer.name) changedData.name = data.name;
            if (data.email !== customer.email) changedData.email = data.email;
            if (data.phone !== customer.phone) changedData.phone = data.phone || undefined;

            if (Object.keys(changedData).length === 0) {
                toast.info("No changes detected");
                return;
            }

            // Disable inputs while submitting handled by formState.isSubmitting
            await updateProfile(changedData);

            // Refresh user data in context
            await getCustomer();

            toast.success("Profile updated successfully");
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const backendErrors = error.response.data.errors;
                Object.entries(backendErrors).forEach(([field, messages]: any) => {
                    form.setError(field as keyof BasicInfoValues, {
                        message: messages[0],
                    });
                });
            } else {
                toast.error("Failed to update profile");
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <User className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        {...field}
                                        className="pl-9"
                                        placeholder="Full name"
                                        autoComplete="name"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        {...field}
                                        type="email"
                                        className="pl-9"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Field */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Phone className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        {...field}
                                        type="tel"
                                        className="pl-9"
                                        placeholder="+1 234 567 8900"
                                        autoComplete="tel"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save changes"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileForm;
