import { Outlet } from 'react-router-dom'
// import React from 'react'

const AuthLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
