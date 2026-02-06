'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/customer',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Referer': 'http://localhost:3000',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join('; ');
    if (cookieHeader) {
      config.headers.set('Cookie', cookieHeader);
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
    // await api.post('/logout');
  }
  return Promise.reject(error);
});
export default api


