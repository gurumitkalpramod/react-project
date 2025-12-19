import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user?: { username: string }
}

const initialState: AuthState = {
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true
      state.user = payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = undefined
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
