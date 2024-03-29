import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({
        notification: `${user.name} logged in`,
        type: 'positive',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        notification: 'Wrong username or password',
        type: 'negative',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])
      setNotification({
        notification: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'positive',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        notification: 'Missing title or author',
        type: 'negative',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addLike = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)))
    } catch (exception) {
      console.error(exception)
    }
  }

  const removeBlog = async (blogToRemove) => {
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      try {
        await blogService.deleteBlog(blogToRemove.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
        setNotification({
          notification: `Blog ${blogToRemove.title} by ${blogToRemove.author} deleted`,
          type: 'positive',
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (exception) {
        console.error(exception)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      {user ? (
        <>
          {user.name} is logged in &nbsp;
          <button onClick={handleLogout}>logout</button>
        </>
      ) : null}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog, index) => (
        <Blog
          key={blog.id || index}
          blog={blog}
          updateLikes={addLike}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
