import axios from 'axios'
import { redirect } from 'next/navigation';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/customer',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Referer': 'http://localhost:3000',
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
  if (error.status === 401) {
    redirect('/login');
  }
  return Promise.reject(error);
});
export default api


