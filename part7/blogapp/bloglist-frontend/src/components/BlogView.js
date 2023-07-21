import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useBlogs } from '../hooks'

const BlogView = () => {
  const { likeBlog, addComment } = useBlogs()
  const id = useParams().id
  const { blogs } = useSelector((state) => state.blogs)

  if (blogs === undefined) {
    return null
  }

  const blog = blogs.find((b) => b.id === id)

  const handleLike = async () => {
    await likeBlog(id, blog)
  }

  const [comment, setComment] = useState('')

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
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </p>
      <div>{blog.likes} likes</div>
      <button id="add-like" onClick={handleLike}>
        like
      </button>
      <p>added by {blog.user.name}</p>
      <h2>comments</h2>
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
