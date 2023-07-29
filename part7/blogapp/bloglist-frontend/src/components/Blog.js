import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Typography, Link as MuiLink } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleDetails = () => {
    setVisible(!visible)
  }

  const showWhenVisible = {
    display: visible ? 'flex' : 'none',
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
    <Box
      border={1}
      borderColor="text.primary"
      p={2}
      marginTop={2}
      borderRadius={2}
    >
      <div className="blog-details">
        <MuiLink component={RouterLink} to={`/blogs/${blog.id}`}>
          <span
            style={{
              fontSize: '1.75rem',
              lineHeight: '1.95rem',
              textDecoration: 'none',
            }}
          >
            {blog.title}
          </span>
        </MuiLink>
        <Typography variant="paragraphHeader">
          <p>Blog made by {blog.author}</p>
        </Typography>
        <Typography variant="paragraph">
          <p
            style={{
              marginTop: '1rem',
            }}
          >
            {blog.url}
          </p>
        </Typography>
        <Typography variant="paragraph">User: </Typography>
        <MuiLink component={RouterLink} to={`/users/${blog.user.id}`}>
          {blog.user.name}
        </MuiLink>
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
              fontSize: 14,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="paragraph"
              sx={{
                textDecoration: 'underline',
              }}
            >
              {blog.comments.length > 0
                ? visible
                  ? 'Hide'
                  : 'View Comments'
                : null}
            </Typography>
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
            <Typography variant="paragraph">{blog.likes}</Typography>
            <FavoriteIcon
              id="add-like"
              onClick={addNewLike}
              color="danger"
              sx={{
                borderColor: '#fff',
                fontSize: 26,
                cursor: 'pointer',
                paddingLeft: '3px',
              }}
            />
          </div>
          <div>
            {user.name === blog.user.name ? (
              <Button
                variant="contained"
                id="remove-blog"
                onClick={deleteBlog}
                color="primary"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  marginLeft: 1,
                  padding: '6px 10px',
                }}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Box>
  )
}

export default Blog
