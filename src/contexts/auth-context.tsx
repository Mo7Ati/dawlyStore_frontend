"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Customer, LoginCredentials, RegisterData, ResetPasswordData } from "@/types/auth";
import api from "@/lib/api";
import { Response } from "@/types/general";
import { useRouter } from "next/navigation";

interface AuthContextType {
    customer: Customer | null;
    isLoading: boolean;
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
    const [isLoading, setIsLoading] = useState(customer === null ? true : false);
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
        setIsLoading(true);
        try {
            const response = await api.get<Response<Customer>>('/');
            setCustomer(response.data.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const login = async (loginData: LoginCredentials) => {
        try {
            await getCsrfToken();
            const response = await api.post<Response<Customer>>('/login', loginData);
            setCustomer(response.data.data);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (registerData: RegisterData) => {
        try {
            await getCsrfToken();
            const response = await api.post<Response<Customer>>('/register', registerData);
            setCustomer(response.data.data);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await api.post<Response<Customer>>('/forgot-password', { email });
        } catch (error) {
            console.error(error);
        }
    };

    const resetPassword = async (resetPasswordData: ResetPasswordData) => {
        try {
            const response = await api.post<Response<Customer>>('/reset-password', resetPasswordData);
            router.push('/login?reset=' + btoa(response.data.status));
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
            setCustomer(null);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                customer,
                isLoading,
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


