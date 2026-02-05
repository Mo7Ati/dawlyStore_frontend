import useSWR from 'swr'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Customer } from '@/types/auth'
import { Response } from '@/types/general'
import { AxiosError } from 'axios'

type setMessageType = (message: string | null) => void

interface RegisterProps {
    name: string
    email: string
    password: string
    password_confirmation: string
}

interface LoginProps {
    email: string
    password: string
}

interface ForgotPasswordProps {
    email: string
}

interface ResetPasswordProps {
    password: string
    password_confirmation: string
    email: string
    token: string
}

export const useAuth = () => {
    const router = useRouter()

    const { data: user, error, mutate , isLoading } = useSWR('/me', () =>
        api
            .get<Response<Customer>>('/me')
            .then(res => res.data.data)
            .catch(error => { throw error }),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
            dedupingInterval: 5000,
        }
    )

    const register = async ({ setMessage, registerData }: { setMessage: setMessageType, registerData: RegisterProps }) => {
        setMessage(null)

        try {
            await api.post('/register', registerData)
            mutate()
            router.push('/')
        } catch (error) {
            const axiosError = error as AxiosError<Response<null>>
            if (axiosError.response?.status === 422) {
                setMessage(axiosError.response.data.message)
            }
        }
    }

    const login = async ({ setMessage, loginData }: { setMessage: setMessageType, loginData: LoginProps }) => {
        setMessage(null)

        try {
            await api.post('/login', loginData)
            mutate()
            router.push('/')
        } catch (error) {
            const axiosError = error as AxiosError<Response<null>>
            if (axiosError.response?.data) {
                setMessage(axiosError.response.data.message)
            } else {
                setMessage('An unexpected error occurred')
            }
        }
    }

    const forgotPassword = async ({ setMessage, email }: { setMessage: setMessageType, email: string }) => {
        setMessage(null)

        try {
            await api.post('/forgot-password', { email })
        } catch (error) {
            const axiosError = error as AxiosError<Response<null>>
            if (axiosError.response?.data) {
                setMessage(axiosError.response.data.message)
            }
        }
    }

    const resetPassword = async ({ setMessage, resetPasswordData }: { setMessage: setMessageType, resetPasswordData: ResetPasswordProps }) => {
        setMessage(null)

        try {
            const response = await api.post('/reset-password', {
                ...resetPasswordData,
            })
            router.push('/login?reset=' + btoa(response.data.status))
        } catch (error) {
            const axiosError = error as AxiosError<Response<null>>
            if (axiosError.response?.data) {
                setMessage(axiosError.response.data.message)
            }
        }
    }

    const logout = async () => {
        if (!error) {
            await api.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }


    return {
        user,
        isLoading,
        register,
        login,
        forgotPassword,
        resetPassword,
        // resendEmailVerification,
        logout,
    }
}