import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
} from 'react-router-dom'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogFrom from './components/BlogForm'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'

import { useDispatch, useSelector } from 'react-redux'
import {
  initBlogs,
  addBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

const storageKey = 'loggedBlogappUser'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const currentUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storageKey)
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)))
      blogService.setToken(JSON.parse(loggedUserJSON).token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  const notifyWith = (message, style = 'success', timeout) => {
    dispatch(setNotification(message, style, timeout))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(storageKey, JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      notifyWith('login success', 'success')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    dispatch(addBlog(blogObject, notifyWith))
    blogFormRef.current.toggleVisibility()
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      notifyWith('error liking blog', 'error')
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        history.push('/')
        await dispatch(removeBlog(blog))
        notifyWith('blog removed', 'success')
      } catch (exception) {
        if (exception.response.status === 401) {
          notifyWith('only the owner of a blog can remove it', 'error')
        } else {
          notifyWith('error removing blog', 'error')
        }
      }
    }
  }

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : {}

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
      notification={notification}
    />
  )

  const blogList = () => (
    <div>
      <div style={navBarStyle}>
        <Link style={navLinkStyle} to="/">
          blogs
        </Link>
        <Link style={navLinkStyle} to="/users">
          notes
        </Link>
        <span style={navLinkStyle}>{currentUser.name} logged in</span>
        <button
          onClick={() => {
            dispatch(setUser(null))
            window.localStorage.removeItem(storageKey)
          }}
        >
          logout
        </button>
      </div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      <Switch>
        <Route path="/users/:id">
          <UserInfo user={matchedUser} />
        </Route>
        <Route path="/users">
          <UsersInfo blogs={blogs} />
        </Route>
        <Route path="/blogs/:id">
          <Blog
            blog={matchedBlog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={currentUser}
          />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogFrom createBlog={createBlog} />
          </Togglable>
          <div id="blogs">
            {blogs
              .sort((blog1, blog2) => {
                return blog2.likes - blog1.likes
              })
              .map((blog) => (
                <div key={blog.id} style={blogStyle}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
              ))}
          </div>
        </Route>
      </Switch>
    </div>
  )

  return <div>{currentUser === null ? loginForm() : blogList()}</div>
}

const navBarStyle = {
  padding: 5,
  marginBottom: 5,
  backgroundColor: 'lightgrey',
}

const navLinkStyle = {
  paddingRight: 10,
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

export default App
