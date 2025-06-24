import { Suspense, lazy } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { Navigate } from 'react-router-dom'
// import React from 'react'

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));

const publicRoutes = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]

export default publicRoutes
