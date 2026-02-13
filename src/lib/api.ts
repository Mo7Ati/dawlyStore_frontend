import axios from 'axios'
import { redirect } from 'next/navigation';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Referer': process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
  timeout: 10000,
  withCredentials: true,
  withXSRFToken: true,
})

api.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      config.headers['Cookie'] = cookieStore.toString()
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(function onFulfilled(response) {
  return response;
}, async function onRejected(error) {
  console.error(error.response);
  if (error.status === 401 ) {
    redirect('/login');
  }
  if (error.status === 404) {
    redirect('/not-found');
  }
  return Promise.reject(error);
});
export default api


