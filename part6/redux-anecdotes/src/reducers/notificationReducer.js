import { createSlice } from '@reduxjs/toolkit'

const initialState = 'test notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  setFilter(state, action) {
    return state ? action.data : state
  }
})
