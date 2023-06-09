import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: '',
  timeout: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const { message, timeout } = action.payload
      state.notification = message
      state.timeout = timeout
    },
  },
})

export const { addNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  const obj = { message, timeout }
  return async (dispatch) => {
    dispatch(addNotification(obj))
  }
}

export default notificationSlice.reducer
