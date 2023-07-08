import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification.notification)
  const type = useSelector((state) => state.notification.type)
  const timeout = useSelector((state) => state.notification.timeout)
  console.log(message)
  // Styles for the type of notification
  const positiveStyle = {
    color: 'green',
    fontWeight: 600,
    fontSize: 16,
    border: '3px solid green',
    padding: 15,
    background: 'lightgrey',
  }
  const negativeStyle = {
    color: 'red',
    fontWeight: 600,
    fontSize: 16,
    border: '3px solid red',
    padding: 15,
    background: 'lightgrey',
  }

  useEffect(() => {
    if (message) {
      console.log(message)
      const timer = setTimeout(() => {
        dispatch(setNotification('', '', 0))
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [message, timeout, dispatch])

  if (message === null) {
    return null
  }

  let notificationStyle
  // Depending on the notification type, change the style
  if (type === 'positive') {
    notificationStyle = positiveStyle
  } else if (type === 'negative') {
    notificationStyle = negativeStyle
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
