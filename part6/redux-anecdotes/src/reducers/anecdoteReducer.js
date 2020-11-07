import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

// Main Anecdote Reducer
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      const newAnecdote = asObject(action.data.anecdote)
      return [...state, newAnecdote]
    }
    case 'UPVOTE': {
      const id = action.data.id
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
  return {
    type: 'NEW_ANECDOTE',
    data: { anecdote },
  }
}

export const upvoteAnecdote = (id) => {
  return {
    type: 'UPVOTE',
    data: { id },
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
