"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Customer, LoginCredentials, RegisterData, ResetPasswordData } from "@/types/auth";
import api from "@/lib/api";
import { Response } from "@/types/general";
import { useRouter, useSearchParams } from "next/navigation";

interface AuthContextType {
    customer: Customer | null;
    isCustomerLoading: boolean;
    getCsrfToken: () => Promise<string | null>;
    getCustomer: () => Promise<void>;
    login: (loginData: LoginCredentials) => Promise<void>;
    register: (registerData: RegisterData) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (resetPasswordData: ResetPasswordData) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (customer) return;
        getCustomer();
    }, []);

    const getCsrfToken = async () => {
        try {
            const response = await api.get<Response<string>>('/sanctum/csrf-cookie', {
                baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
            });
            return response.data.data;
        } catch (error) {
            return null;
        }
    };

    const getCustomer = async () => {
        try {
            const response = await api.get<Response<Customer>>('/');
            setCustomer(response.data.data);
        } catch (error) {
            setCustomer(null);
        } finally {
            setIsCustomerLoading(false);
        }
    };

    const login = async (loginData: LoginCredentials) => {
        await getCsrfToken();
        await api.post<Response<Customer>>('/login', loginData);
        getCustomer();
        const redirect = searchParams.get('redirect');
        router.push(redirect ?? '/');
    };

    const register = async (registerData: RegisterData) => {
        await getCsrfToken();
        const response = await api.post<Response<Customer>>('/register', registerData);
        setCustomer(response.data.data);
        const redirect = searchParams.get('redirect');
        router.push(redirect ?? '/');
    };

    const forgotPassword = async (email: string) => {
        await api.post<Response<Customer>>('/forgot-password', { email });
    };

    const resetPassword = async (resetPasswordData: ResetPasswordData) => {
        const response = await api.post<Response<Customer>>('/reset-password', resetPasswordData);
        router.push('/login?reset=' + btoa(response.data.status));
    };

    const logout = async () => {
        try {
            await api.post('/logout');
            setCustomer(null);
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                customer,
                isCustomerLoading: isCustomerLoading,
                getCsrfToken,
                getCustomer,
                login,
                register,
                forgotPassword,
                resetPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;


