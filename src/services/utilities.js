import axios from 'axios'
import { history } from 'services/helpers'

export const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
  },
})

// LOGOUT FUNCTIONALITY
export const logout = () => {
  localStorage.clear()
  history.push('/auth/login')
}
