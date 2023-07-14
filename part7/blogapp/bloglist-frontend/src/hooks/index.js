import { setNotification } from '../reducers/notificationReducer'
import {
  initializeBlogs,
  createNewBlog,
  deleteSelectedBlog,
  likeSelectedBlog,
} from '../reducers/blogsReducer'
import { setLogin, logout, getAllUsers } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
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

  const getAll = () => {
    try {
      dispatch(getAllUsers())
    } catch (error) {
      console.error(error)
    }
  }

  const loginUser = async (username, password) => {
    try {
      const user = await dispatch(setLogin(username, password))
      if (user) {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        console.log(user.name)
        dispatch(setNotification(`${user.name} logged in`, 'positive', 5000))
      }
    } catch (error) {
      console.error(error)
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
    getAll,
  }
}