import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: null,
    author: null,
    url: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
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
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        title:
          <input 
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({target}) => setNewBlog(prevState => ({
            ...prevState,
            title: target.value
          }))}
          />
      </div>
      <div>
        author:
          <input 
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({target}) => setNewBlog(prevState => ({
            ...prevState,
            author: target.value
          }))}
          />
      </div>
      <div>
        url:
          <input 
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({target}) => setNewBlog(prevState => ({
            ...prevState,
            url: target.value
          }))}
          />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const handleNewBlog = async event => {
    event.preventDefault()
    try {
      await blogService.create(newBlog)
      setNewBlog({
        title: null,
        author: null,
        url: null
      })
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      console.error(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user ? <><p>{user.name} is logged in</p><button onClick={handleLogout}>logout</button></> : null}
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App