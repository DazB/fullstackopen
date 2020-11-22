import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogFrom from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  initBlogs,
  addBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

const storageKey = 'loggedBlogappUser'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storageKey)
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)))
      blogService.setToken(JSON.parse(loggedUserJSON).token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
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
    try {
      dispatch(addBlog(blogObject))
      blogFormRef.current.toggleVisibility()
      notifyWith(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        'success'
      )
    } catch (exception) {
      notifyWith('error adding blog', 'error')
    }
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
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button
          onClick={() => {
            dispatch(setUser(null))
            window.localStorage.removeItem(storageKey)
          }}
        >
          logout
        </button>
      </p>
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
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          ))}
      </div>
    </div>
  )

  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
