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
      return state.blogs.map((blog) => {
        blog.id !== id ? blog : changedBlog // Return a new array with the updated blog
      })
    },
    deleteBlog(state, action) {
      // Reducer for deleting a blog
      const id = action.payload.id // Extract the ID of the blog to be deleted from the payload
      return state.blogs.filter((b) => b.id !== id) // Return a new array without the deleted blog
    },
  },
})

export const { appendBlog, setBlogs, likeBlog, deleteBlog } = blogsSlice.reducer // Exporting the reducer functions as named exports

export const initializeBlogs = () => {
  // Exporting an async action creator function
  return async () => {
    const blogs = await blogService.getAll() // Fetching all blogs from the blog service module
    return blogs
  }
}
