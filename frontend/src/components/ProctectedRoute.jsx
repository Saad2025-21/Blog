import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProctectedRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth)

  return user === null ? <Navigate to="/login" replace /> : <>{children}</>
}

export default ProctectedRoute