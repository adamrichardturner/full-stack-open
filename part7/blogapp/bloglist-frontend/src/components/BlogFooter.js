import { useState } from 'react'
import { useBlogs } from '../hooks'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Button, TextField } from '@mui/material'

const BlogFooter = ({ blog, user }) => {
  const { id } = blog
  const [comment, setComment] = useState('')
  const { likeBlog, addComment, removeBlog } = useBlogs()

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
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
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
      <div>
        <form
          className="commentForm"
          onSubmit={handleComment}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifySelf: 'flex-start',
          }}
        >
          <TextField
            label="Leave a comment"
            variant="filled"
            id="comment"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            sx={{
              width: '90%',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            id="comment"
            onClick={handleComment}
            color="primary"
            sx={{
              border: '1px solid #000',
              height: '3.5rem',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'var(--tertiary-main)', // Replace with your desired hover background color
              },
            }}
          >
            Comment
          </Button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogFooter
