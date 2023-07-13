import { setNotification } from '../reducers/notificationReducer'
import {
  initializeBlogs,
  createNewBlog,
  deleteSelectedBlog,
  likeSelectedBlog,
} from '../reducers/blogsReducer'
import { setLogin, logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

export const useBlogs = () => {
  const dispatch = useDispatch()

  const getBlogs = () => {
    const latestBlogs = dispatch(initializeBlogs())
    return latestBlogs
  }

  const createBlog = (blogData) => {
    try {
      dispatch(createNewBlog(blogData))
      dispatch(
        setNotification(
          `a new blog ${blogData.title} by ${blogData.author} added`,
          'positive',
          5000
        )
      )
    } catch (exception) {
      dispatch(setNotification('Missing title or author', 'negative', 5000))
    }
  }

  const removeBlog = (blogData) => {
    if (window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`)) {
      try {
        dispatch(deleteSelectedBlog(blogData))
        dispatch(
          setNotification(
            `Blog ${blogData.title} by ${blogData.author} deleted`,
            'positive',
            5000
          )
        )
      } catch (exception) {
        console.error(exception)
      }
    }
  }

  const likeBlog = async (id, blogData) => {
    try {
      dispatch(likeSelectedBlog(id, blogData))
      dispatch(
        setNotification(`You liked ${blogData.title}.`, 'positive', 5000)
      )
    } catch (exception) {
      console.error(exception)
    }
  }

  return {
    getBlogs,
    createBlog,
    removeBlog,
    likeBlog,
  }
}

export const useUser = () => {
  const dispatch = useDispatch()

  const loginUser = (username, password) => {
    try {
      dispatch(setLogin(username, password))
      // dispatch(setNotification(`${user.name} logged in`, 'positive', 5000))
      // window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('Wrong username or password', 'negative', 5000))
    }
  }

  const logoutUser = () => {
    try {
      dispatch(logout())
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    loginUser,
    logoutUser,
  }
}
