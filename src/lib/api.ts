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

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status)
    switch (error.response?.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        // router.push('/errors/not-found')
        break;
      default:
        // router.push('/errors/internal-server-error')
    }

    // Preserve the full error object so we can access response.data
    return Promise.reject(error)
  }
)

export default api
