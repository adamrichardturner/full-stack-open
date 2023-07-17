import { useSelector } from 'react-redux'

const UserSummary = () => {
  const allUsers = useSelector((state) => state.user.allUsers)
  const summary = allUsers.map((user) => {
    return (
      <div
        key={user.id}
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            minWidth: 160,
          }}
        >
          {user.name}
        </div>
        <div>{user.blogs.length}</div>
      </div>
    )
  })
  return (
    <>
      <h2>Users</h2>
      <div>
        <h3
          style={{
            marginLeft: 160,
            margin: 0,
          }}
        >
          blogs created
        </h3>
      </div>
      {summary}
    </>
  )
}

export default UserSummary
