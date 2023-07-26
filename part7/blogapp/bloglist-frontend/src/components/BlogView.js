import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useBlogs } from '../hooks'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Button } from '@mui/material'

const BlogView = () => {
  const { likeBlog, addComment, removeBlog } = useBlogs()
  const id = useParams().id
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')

  const toggleDetails = () => {
    setVisible(!visible)
  }

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    await likeBlog(id, blog)
  }

  const handleDelete = () => {
    removeBlog(blog)
  }

  const handleComment = (event) => {
    event.preventDefault()
    const obj = {
      id,
      text: comment,
    }
    addComment(id, obj)
  }

  return (
    <>
      <h2
        style={{
          fontSize: '3rem',
          lineHeight: '3.2rem',
          marginTop: 15,
        }}
      >
        {blog.title}
      </h2>
      <p
        style={{
          fontSize: '1.25rem',
        }}
      >
        {blog.url}
      </p>
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
              onClick={handleLike}
              sx={{
                color: '#fff',
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
                onClick={handleDelete}
                color="danger"
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
      <form className="commentForm" onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogView
