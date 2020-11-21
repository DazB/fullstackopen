import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogFrom from './components/BlogForm'

const storageKey = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    text: null,
    type: '',
    timeout: null,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storageKey)
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
      blogService.setToken(JSON.parse(loggedUserJSON).token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll()
      setBlogs(fetchedBlogs)
    }
    fetchBlogs()
  }, [])

  const notifyWith = (message, type = 'success') => {
    clearTimeout(notification.timeout)
    setNotification({
      message,
      type,
      timeout: setTimeout(() => {
        setNotification({
          text: null,
          type: '',
        })
      }, 5000),
    })
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
      setUser(user)
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
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      notifyWith(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      )
    } catch (exception) {
      notifyWith('error adding blog', 'error')
    }
  }

  const handleLike = async (blogObject) => {
    try {
      const likedBlog = {
        ...blogObject,
        likes: blogObject.likes + 1,
        user: blogObject.user.id,
      }
      const updatedBlog = await blogService.update(likedBlog.id, likedBlog)
      setBlogs(
        blogs.map((blog) =>
          blog.id !== updatedBlog.id ? blog : { ...blog, likes: blog.likes + 1 }
        )
      )
    } catch (exception) {
      notifyWith('error liking blog', 'error')
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
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
            setUser(null)
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
