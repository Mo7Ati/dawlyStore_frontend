import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/customer',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
})

api.defaults.withCredentials = true;


api.interceptors.response.use(function onFulfilled(response) {
  return response;
}, async function onRejected(error) {
  console.log(error.status);
  
  const hasToken = typeof document !== 'undefined' && document.cookie.includes('token=');
  if (error.status === 401) {
    await api.post('/logout');
  }
  return Promise.reject(error);
});
export default api
