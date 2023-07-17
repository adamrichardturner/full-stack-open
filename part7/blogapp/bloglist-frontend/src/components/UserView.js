import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
  const id = useParams().id
  const allUsers = useSelector((state) => state.user.allUsers)
  const user = allUsers.find((a) => a.id === id)
  const blogs = user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{blogs}</ul>
    </div>
  )
}

export default UserView
