import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useBlogs } from '../hooks'

const BlogView = () => {
  const { likeBlog } = useBlogs()
  const id = useParams().id
  const { blogs } = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  const handleLike = async () => {
    await likeBlog(id, blog)
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </p>
      <div>{blog.likes} likes</div>
      <button id="add-like" onClick={handleLike}>
        like
      </button>
    </>
  )
}

export default BlogView
