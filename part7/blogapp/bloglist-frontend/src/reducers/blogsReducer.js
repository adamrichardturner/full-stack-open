import { createSlice } from '@reduxjs/toolkit' // Importing the necessary function from Redux Toolkit
import blogService from '../services/blogs' // Importing a blog service module

const initialState = {
  blogs: [], // Initial state with an empty array for blogs
}

const blogsSlice = createSlice({
  name: 'blogs', // Name of the slice
  initialState, // Initial state object
  reducers: {
    appendBlog(state, action) {
      console.log(action.payload)
      // Reducer for appending a new blog to the state
      state.blogs.push(action.payload) // Add the payload (new blog) to the blogs array
    },
    setBlogs(state, action) {
      // Reducer for setting the blogs array to a new value
      state.blogs = action.payload // Replace the blogs array with the payload (new array of blogs)
    },
    likeBlog(state, action) {
      // Reducer for updating the likes count of a blog
      const id = action.payload.id // Extract the ID of the blog to be liked from the payload
      const blogToLike = state.blogs.find((b) => b.id === id) // Find the blog in the array based on its ID
      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1, // Increment the likes count of the found blog
      }
      state.blogs = state.blogs.map((b) => (b.id === id ? changedBlog : b))
    },
    deleteBlog(state, action) {
      // Reducer for deleting a blog
      const id = action.payload.id // Extract the ID of the blog to be deleted from the payload
      return state.blogs.filter((b) => b.id !== id) // Return a new array without the deleted blog
    },
  },
})

export const { appendBlog, setBlogs, likeBlog, deleteBlog } = blogsSlice.actions // Exporting the reducer functions as named exports

export const initializeBlogs = () => {
  // Exporting an async action creator function
  return async () => {
    const blogs = await blogService.getAll() // Fetching all blogs from the blog service module
    return blogs
  }
}

export const createNewBlog = (blogData) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blogData)
    dispatch(appendBlog(newBlog))
  } catch (error) {
    console.error(error)
  }
}

export const likeSelectedBlog = (id, blogData) => async (dispatch) => {
  try {
    const returnedBlog = await blogService.update(id, blogData)
    await dispatch(likeBlog(returnedBlog))
  } catch (error) {
    console.error(error)
  }
}

export const deleteSelectedBlog = (blogData) => async (dispatch) => {
  try {
    await blogService.deleteBlog(blogData.id)
    await dispatch(deleteBlog(blogData))
  } catch (error) {
    console.error(error)
  }
}

export default blogsSlice.reducer
