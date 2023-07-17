import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUser } from '../hooks'

const Navigation = () => {
  const { user } = useSelector((state) => state.user)
  const { logoutUser } = useUser()
  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    logoutUser()
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          {user.name} is logged in &nbsp;
          <button onClick={handleLogout}>logout</button>
        </>
      ) : null}
    </div>
  )
}

export default Navigation
