import { useEffect, useRef } from 'react'
import BlogsList from './components/BlogsList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserSummary from './components/UserSummary'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { useBlogs, useUser } from './hooks'
import blogService from './services/blogs'
import { addUser } from './reducers/userReducer'

const App = () => {
  let loggedUser = useSelector((state) => state.user)
  const { user } = loggedUser
  const { getBlogs, createBlog } = useBlogs()
  const { logoutUser, getAll } = useUser()
  const blogFormRef = useRef()
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    logoutUser()
  }

  const handleCreateBlog = (blogData) => {
    blogFormRef.current.toggleVisibility()
    createBlog(blogData)
  }

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
      <Notification />
      {user ? (
        <>
          {user.name} is logged in &nbsp;
          <button onClick={handleLogout}>logout</button>
        </>
      ) : null}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <UserSummary />
      <BlogsList />
    </div>
  )
}

export default App
