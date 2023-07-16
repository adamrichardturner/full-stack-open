import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useBlogs } from './hooks'

const BlogsList = () => {
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const { removeBlog, likeBlog } = useBlogs()

  const handleLike = async (id, updatedBlog) => {
    await likeBlog(id, updatedBlog)
  }

  const handleRemove = async (blogToRemove) => {
    await removeBlog(blogToRemove)
  }

  return blogs.map((blog, index) => {
    return (
      <Blog
        key={blog.id || index}
        blog={blog}
        updateLikes={handleLike}
        removeBlog={handleRemove}
        user={user}
      />
    )
  })
}

export default BlogsList