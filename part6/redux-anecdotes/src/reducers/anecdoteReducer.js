import anecdotesService from '../services/anecdotes'

// Main Anecdote Reducer
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    case 'UPVOTE': {
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : action.data
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

export const upvoteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const upvotedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    const updatedAnecdote = await anecdotesService.update(upvotedAnecdote)

    dispatch({
      type: 'UPVOTE',
      data: updatedAnecdote,
    })
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
