import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  user: null,
  allUsers: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    addAllUsers(state, action) {
      const { users } = action.payload
      state.allUsers = users
    },
  },
})

export const { addUser, logout, addAllUsers } = userSlice.actions

export const setLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    dispatch(addUser(user))
    blogService.setToken(user.token)
    return user
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch(addAllUsers(users))
  }
}

export default userSlice.reducer
