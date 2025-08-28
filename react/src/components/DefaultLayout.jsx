import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div>
        <h1>Default</h1>
        <Outlet />
    </div>
  )
}
