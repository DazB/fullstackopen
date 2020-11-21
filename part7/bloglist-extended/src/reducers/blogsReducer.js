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
    // case 'UPVOTE': {
    //   return state.map((anecdote) =>
    //     anecdote.id !== action.data.id ? anecdote : action.data
    //   )
    // }
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

// export const createBlog = (anecdote) => {
//   return async (dispatch) => {
//     const newAnecdote = await anecdotesService.create(anecdote)
//     dispatch({
//       type: 'NEW_ANECDOTE',
//       data: newAnecdote,
//     })
//   }
// }

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
