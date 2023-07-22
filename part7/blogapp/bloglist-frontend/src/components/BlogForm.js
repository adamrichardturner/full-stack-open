import { useState } from 'react'
import { Button, TextField } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new Blog</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TextField
          label="Blog Title"
          variant="filled"
          sx={{
            marginBottom: 2,
            marginRight: 2,
            background: '#F5F5F5',
            borderRadius: '5px',
            width: '50%',
          }}
          id="title"
          type="text"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              title: target.value,
            }))
          }
        />
        <TextField
          label="Blog made by"
          variant="filled"
          sx={{
            marginBottom: 2,
            background: '#F5F5F5',
            borderRadius: '5px',
            width: '50%',
          }}
          id="author"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              author: target.value,
            }))
          }
        />
      </div>
      <div>
        <TextField
          label="Blog Summary:"
          variant="filled"
          fullWidth
          multiline
          sx={{
            marginBottom: 2,
            background: '#F5F5F5',
            borderRadius: '5px',
          }}
          maxRows={10}
          id="url"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              url: target.value,
            }))
          }
        />
      </div>
      <Button
        variant="contained"
        id="add-blog"
        type="submit"
        sx={{
          color: '#fff',
          borderColor: '#fff',
          padding: '6px 16px',
        }}
      >
        Create Blog
      </Button>
    </form>
  )
}

export default BlogForm
