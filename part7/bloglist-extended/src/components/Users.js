import React from 'react'

const UsersInfo = ({ blogs }) => {
  let usersBlogs = {}

  blogs.forEach((blog) => {
    if (usersBlogs[blog.user.username]) {
      usersBlogs[blog.user.username]++
    } else {
      usersBlogs[blog.user.username] = 1
    }
  })

  return (
    <div>
      <h2>Users</h2>
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <tr>
            <th></th>
            <th>
              {' '}
              <b>blogs created</b>
            </th>
          </tr>
          {Object.entries(usersBlogs).map((user) => (
            <tr key={user[0]}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersInfo
