import { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
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
    marginBottom: 5
  }

  const updatedBlog = {
    user: blog.user,
    likes: 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const addNewLike = () => {
    updateLikes(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes}&nbsp;
        <button onClick={addNewLike}>like</button><br />
        {blog.user.name}
      </div>
      <div>
        <button onClick={toggleDetails}>{ visible ? 'hide' : 'view' }</button>
      </div>
    </div>
  )
}

export default Blog


