import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleRemove, handleLike, user }) => {
  if (!blog) {
    return null
  }

  const showIfUserLoggedIn = () =>
    user.username === blog.user.username ? (
      <button id="button-remove" onClick={() => handleRemove(blog)}>
        remove
      </button>
    ) : null

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <span className="blog-likes">{`likes ${blog.likes}`}</span>
      <button id="button-like" onClick={() => handleLike(blog)}>
        like
      </button>
      <div>added by {blog.user.name}</div>
      {showIfUserLoggedIn()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
