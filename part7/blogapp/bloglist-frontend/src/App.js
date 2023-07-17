import { useEffect } from 'react'
import Navigation from './components/Navigation'
import BlogsList from './components/BlogsList'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import UserSummary from './components/UserSummary'
import UserView from './components/UserView'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { useBlogs, useUser } from './hooks'
import blogService from './services/blogs'
import { addUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Router>
        <Navigation />
        <Notification />
        <h1>Blog App</h1>
        <Routes>
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<UserSummary />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/" element={<BlogsList />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
