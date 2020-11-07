import anecdotesService from '../services/anecdotes'

// Main Anecdote Reducer
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    case 'UPVOTE': {
      const id = action.data
      const anecdoteToUpvote = state.find((a) => a.id === id)
      const upvotedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : upvotedAnecdote
      )
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }
}

// Action creators
export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const upvoteAnecdote = (id) => {
  return {
    type: 'UPVOTE',
    data: id,
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
