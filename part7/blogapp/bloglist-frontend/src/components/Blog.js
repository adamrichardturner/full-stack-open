import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleDetails = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updatedBlog = {
    user: blog.user,
    likes: 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  const addNewLike = () => {
    updateLikes(blog.id, updatedBlog)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-details">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
      <div style={showWhenVisible} className="blog-extra-details">
        {blog.url}
        <br />
        likes {blog.likes}&nbsp;
        <button id="add-like" onClick={addNewLike}>
          like
        </button>
        <br />
        {blog.user.name}
      </div>
      <div>
        <button id="toggle-details" onClick={toggleDetails}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div>
        {user.name === blog.user.name ? (
          <button id="remove-blog" onClick={deleteBlog}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
