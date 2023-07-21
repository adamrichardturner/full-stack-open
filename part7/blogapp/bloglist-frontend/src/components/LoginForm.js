import { useState } from 'react'
import { useUser } from '../hooks'
import { TextField } from '@mui/material'

const LoginForm = () => {
  const { loginUser } = useUser('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    loginUser(username, password)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          fullWidth
          sx={{
            marginBottom: 2,
          }}
          label="Username"
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
