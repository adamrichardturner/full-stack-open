import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogFooter from './BlogFooter'

const BlogView = () => {
  const id = useParams().id
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  return (
    <article className="blog">
      <div className="blog__meta">
        <h2
          style={{
            fontSize: '3rem',
            lineHeight: '3.2rem',
            marginTop: 15,
          }}
        >
          {blog.title}
        </h2>
      </div>
      <div className="blog__content">
        <p
          style={{
            fontSize: '1.25rem',
          }}
        >
          {blog.url}
        </p>
      </div>
      <BlogFooter blog={blog} user={user} />
    </article>
  )
}

export default BlogView
