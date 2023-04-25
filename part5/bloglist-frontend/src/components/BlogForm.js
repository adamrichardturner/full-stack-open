import { useState } from 'react'

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
      url: newBlog.url
    })

    setNewBlog({
        title: '',
        author: '',
        url: '',
      })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              title: target.value,
            }))
          }
        />
      </div>
      <div>
        author:
        <input
          type="text"
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
        url:
        <input
          type="text"
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
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm