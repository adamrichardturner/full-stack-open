import { useState } from 'react'
import { useUser } from '../hooks'
import Notification from './Notification'
import { Container, TextField, Button } from '@mui/material'
import logo from '../blogz.png'

const LoginForm = () => {
  const { loginUser } = useUser('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    loginUser(username, password)
  }

  return (
    <>
      <Notification />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginBottom: 10,
          }}
        >
          <h1
            style={{
              fontSize: '6rem',
            }}
          >
            Blogz
          </h1>
          <img
            src={logo}
            alt="Blogz"
            style={{
              width: '60px',
              alignSelf: 'center',
            }}
          />
        </div>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                background: '#F5F5F5',
                borderRadius: '5px',
              }}
              label="Username"
              id="username"
              type="text"
              value={username}
              name="Username"
              variant="filled"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                background: '#F5F5F5',
                borderRadius: '5px',
              }}
              label="Password"
              type="password"
              value={password}
              name="Password"
              variant="filled"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button
            id="login-button"
            variant="contained"
            type="submit"
            sx={{
              color: '#000',
              borderColor: '#000',
              backgroundColor: '#fff',
            }}
          >
            Login
          </Button>
          {/* <button id="login-button" type="submit">
        login
      </button> */}
        </form>
      </Container>
    </>
  )
}

export default LoginForm
