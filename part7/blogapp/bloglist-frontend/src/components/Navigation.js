import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUser } from '../hooks'
import logo from '../blogz.png'
import { Button } from '@mui/material'
import Notification from './Notification'

const Navigation = () => {
  const { user } = useSelector((state) => state.user)
  const { logoutUser } = useUser()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    logoutUser()
  }

  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottom: '1px solid #fff',
    paddingBottom: 10,
  }

  return (
    <>
      <div
        style={{
          minHeight: '70px',
        }}
      >
        <Notification />
      </div>
      <div style={styles}>
        <div>
          <div
            style={{
              display: 'flex',
            }}
          >
            <h1
              style={{
                fontSize: '4rem',
              }}
            >
              Blogz
            </h1>
            <img
              src={logo}
              alt="Blogz"
              style={{
                width: '60px',
                alignSelf: 'center',
              }}
            />
          </div>
          <Link to="/" style={{ marginRight: 15 }}>
            Posts
          </Link>
          <Link to="/users">Users</Link>
        </div>
        <div>
          {user ? (
            <>
              <div>
                <div>
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '1.5rem',
                    }}
                    className="login-user"
                  >
                    {user.name}
                  </span>{' '}
                  <span
                    style={{
                      fontSize: '1.25rem',
                    }}
                    className="login-status"
                  >
                    is logged in
                  </span>
                </div>
                <div
                  style={{
                    textAlign: 'right',
                  }}
                >
                  <Button
                    id="login-button"
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                      marginTop: '10px',
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Navigation
