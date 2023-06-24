import React, { createContext, useReducer } from 'react'

const initialState = {
  message: '',
  showNotification: false,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.payload,
        showNotification: true,
      }
    case 'HIDE_NOTIFICATION':
      return {
        message: '',
        showNotification: false,
      }
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatchNotification] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatchNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
