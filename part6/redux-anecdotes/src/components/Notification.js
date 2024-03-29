import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.notification.notification)
  const timeout = useSelector((state) => state.notification.timeout) * 1000
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        // Clear the notification after 5 seconds
        // Dispatch an action here to clear the notification in the state
        dispatch(setNotification('', 0))
      }, timeout)

      return () => clearTimeout(timer) // Clear the timer if the component is unmounted or notification changes
    }
  }, [notification, timeout, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (!notification) {
    return null // Return null if notification is falsy
  }

  return <div style={style}>{notification}</div>
}

export default Notification
