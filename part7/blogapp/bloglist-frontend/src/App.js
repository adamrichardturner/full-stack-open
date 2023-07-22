import { useEffect } from 'react'
import Navigation from './components/Navigation'
import BlogsList from './components/BlogsList'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import UserSummary from './components/UserSummary'
import UserView from './components/UserView'
import { useDispatch, useSelector } from 'react-redux'
import { useBlogs, useUser } from './hooks'
import blogService from './services/blogs'
import { addUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
const App = () => {
  let loggedUser = useSelector((state) => state.user)
  const { user } = loggedUser
  const { getBlogs } = useBlogs()
  const { getAll } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    const getLatest = () => {
      getBlogs()
      getAll()
    }
    getLatest()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON)
      dispatch(addUser(user))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (user === null) {
    return <LoginForm />
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#e79d19',
      },
      secondary: {
        main: '#ffffff',
      },
      danger: {
        main: '#DC3545',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/users" element={<UserSummary />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/" element={<BlogsList />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
