import { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogDetails, setBlogDetails] = useState({})
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes}&nbsp;
        <button>like</button>
      </div>
      <div>
        <button onClick={toggleDetails}>{ visible ? 'hide' : 'view' }</button>
      </div>
    </div>
  )
}

export default Blog
