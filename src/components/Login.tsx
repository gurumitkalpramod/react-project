import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slices/authSlice'
import type { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated)
  // Always redirect to products (home) after login
  const redirectTo = '/'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // NOTE: For demo purposes this is a fake login. Replace with real auth.
    dispatch(login({ username }))
    navigate(redirectTo, { replace: true })
  }

  if (isAuthenticated) {
    navigate(redirectTo, { replace: true })
    return null
  }

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 6, p: 3, boxShadow: 1, borderRadius: 1 }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>Login</Typography>
      <TextField label="Username" fullWidth size="small" sx={{ mb: 2 }} value={username} onChange={(e) => setUsername(e.target.value)} required />
      <TextField label="Password" type="password" fullWidth size="small" sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" variant="contained" fullWidth>Sign in</Button>
    </Box>
  )
}

export default Login
