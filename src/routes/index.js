import { useRoutes } from 'react-router-dom'
import publicRoutes from './publicRoutes'
import protectedRoutes from './protectedRoutes'

const AppRoutes = () => {
  const routes = [...publicRoutes, ...protectedRoutes]
  return useRoutes(routes)
}

export default AppRoutes
