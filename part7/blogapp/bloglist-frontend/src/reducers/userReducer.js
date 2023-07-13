import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  username: '',
  password: '',
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUsername(state, action) {
      const { username } = action.payload
      state.username = username
    },
    addPassword(state, action) {
      const { password } = action.payload
      state.password = password
    },
    addUser(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.username = ''
      state.password = ''
      state.user = null
    },
  },
})

export const { addUser, addUsername, addPassword, logout } = userSlice.actions

export const setLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    dispatch(addUser(user))
    blogService.setToken(user.token)
  }
}

export default userSlice.reducer
