import blogs from '../services/blogs'
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

// export const upvoteAnecdote = (anecdote) => {
//   return async (dispatch) => {
//     const upvotedAnecdote = {
//       ...anecdote,
//       votes: anecdote.votes + 1,
//     }
//     const updatedAnecdote = await anecdotesService.update(upvotedAnecdote)

//     dispatch({
//       type: 'UPVOTE',
//       data: updatedAnecdote,
//     })
//   }
// }

export default blogReducer
