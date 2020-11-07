import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    try {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      await anecdoteService.create(content)
      dispatch(createAnecdote(content))
      dispatch(setNotification(`you added '${content}'`), 5)
    } catch (exception) {
      dispatch(setNotification(`error adding anecdote`), 5)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
