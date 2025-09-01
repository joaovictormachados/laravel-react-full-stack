import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/StateContext'

export default function GuestLayout() {
  const { token } = useStateContext();

  // if (import.meta.env.DEV) {
  //   // eslint-disable-next-line no-debugger
  //   debugger;
  // }

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
