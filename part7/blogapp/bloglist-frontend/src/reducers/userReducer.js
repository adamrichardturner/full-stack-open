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
    setUsers(state, action) {
      state.allUsers = action.payload
    },
  },
})

export const { addUser, logout, setUsers } = userSlice.actions

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

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    await dispatch(setUsers(users))
  }
}

export default userSlice.reducer
