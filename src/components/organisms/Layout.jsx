import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-custom-background">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout