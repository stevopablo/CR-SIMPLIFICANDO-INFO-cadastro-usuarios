import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.VITE_API_URL || 'http://localhost:3000/api'
})

console.log(import.meta.VITE_API_URL)

export default api;