import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Alert, AlertTitle } from '@mui/material'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification.notification)
  const type = useSelector((state) => state.notification.type)
  const timeout = useSelector((state) => state.notification.timeout)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(setNotification('', '', 0))
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [message, timeout, dispatch])

  if (message === null || message === '') {
    return null
  }

  let alertStyle
  // Depending on the notification type, change the style
  if (type === 'positive') {
    alertStyle = 'success'
  } else if (type === 'negative') {
    alertStyle = 'error'
  }

  return (
    <>
      <Alert variant="outlined" severity={alertStyle} color="">
        <AlertTitle color="primary">{message}</AlertTitle>
      </Alert>
    </>
  )
}

export default Notification
