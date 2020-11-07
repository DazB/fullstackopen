import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    try {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.createAnecdote(content)
      props.setNotification(`you added '${content}'`, 5)
    } catch (exception) {
      props.setNotification(`error adding anecdote`, 5)
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

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm)

export default ConnectedAnecdoteForm
