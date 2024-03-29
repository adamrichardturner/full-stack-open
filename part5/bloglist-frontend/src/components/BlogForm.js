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
      <div>
        title:
        <input
          id="title"
          type="text"
          value={newBlog.title}
          name="Title"
          placeholder="Title"
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
          id="author"
          type="text"
          value={newBlog.author}
          name="Author"
          placeholder="Author"
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
          id="url"
          type="text"
          value={newBlog.url}
          name="Url"
          placeholder="URL"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              url: target.value,
            }))
          }
        />
      </div>
      <button id="add-blog"type="submit">create</button>
    </form>
  )
}

export default BlogForm
