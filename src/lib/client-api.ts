import axios from 'axios'

const clientApi = axios.create({
  baseURL: 'http://localhost:8000/api/customer',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
  withXSRFToken: true,
})

clientApi.interceptors.response.use(function onFulfilled(response) {
  return response;
}, async function onRejected(error) {
  if (error.status === 401) {
    // await clientApi.post('/logout');
  }
  return Promise.reject(error);
});

export default clientApi
