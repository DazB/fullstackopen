import React from 'react'
import { Link } from 'react-router-dom'

const UsersInfo = ({ blogs }) => {
  let usersBlogs = {}

  blogs.forEach((blog) => {
    if (usersBlogs[blog.user.id]) {
      usersBlogs[blog.user.id].number++
    } else {
      usersBlogs[blog.user.id] = { number: 1, username: blog.user.username }
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
              <td>
                <Link to={`/users/${user[0]}`}>{user[1].username}</Link>
              </td>
              <td>{user[1].number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersInfo
