import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { Navigate, useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated)
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  return children
}

export default ProtectedRoute
