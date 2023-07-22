import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleDetails = () => {
    setVisible(!visible)
  }

  const showWhenVisible = {
    display: visible ? 'flex' : 'none',
  }

  const blogStyle = {
    position: 'static',
    padding: 15,
    border: 'solid',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: '5px',
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
          <span
            style={{
              fontSize: '1.75rem',
            }}
          >
            {blog.title}
          </span>
        </Link>
        <p style={{ fontWeight: '800', fontStyle: 'italic', marginBottom: 20 }}>
          {' '}
          Blog made by {blog.author}
        </p>
        <p>{blog.url}</p>
        <p>
          User: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </p>
      </div>
      <div style={showWhenVisible} className="blog-extra-details">
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 5,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            onClick={toggleDetails}
            style={{
              fontSize: 16,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {blog.comments.length > 0
              ? visible
                ? 'Hide'
                : 'View Comments'
              : null}
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {blog.likes}
            <FavoriteIcon
              id="add-like"
              onClick={addNewLike}
              sx={{
                color: '#fff',
                borderColor: '#fff',
                fontSize: 26,
                cursor: 'pointer',
              }}
            />
          </div>
          <div>
            {user.name === blog.user.name ? (
              <Button
                variant="contained"
                id="remove-blog"
                onClick={deleteBlog}
                color="danger"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  marginLeft: 1,
                  padding: '6px 16px',
                }}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
