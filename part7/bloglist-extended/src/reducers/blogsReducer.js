import blogsService from '../services/blogs'

// Main Blogs Reducer
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'NEW_BLOG': {
      return [...state, action.data]
    }
    case 'LIKE': {
      return state.map((blog) =>
        blog.id === action.data.id
          ? { ...action.data, likes: action.data.likes + 1 }
          : blog
      )
    }
    case 'REMOVE_BLOG': {
      return state.filter((blog) => blog.id !== action.data.id)
    }

    default:
      return state
  }
}

// Action creators
export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogToLike = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    await blogsService.update(blogToLike)

    dispatch({
      type: 'LIKE',
      data: blog,
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    })
  }
}

export default blogReducer
