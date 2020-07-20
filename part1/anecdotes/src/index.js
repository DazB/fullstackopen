import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = ()  => {
      let index = Math.floor(Math.random() * Math.floor(anecdotes.length));
      setSelected(index);
  }

  const handleVote = (index) => () => {
    let votesCopy = [ ...votes ];
    votesCopy[index] += 1;
    setVotes(votesCopy);

    
  }

  const mostVoted = () => {
    let max = votes[0];
    let maxIndex = 0;
  
    for (let i = 1; i < votes.length; i++) {
        if (votes[i] > max) {
            maxIndex = i;
            max = votes[i];
        }
    }
    return (
      <div>
        <div>
          {props.anecdotes[maxIndex]}
        </div>
        <div>
          has {max} votes
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <button onClick={handleVote(selected)}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>
      <h1>
        Anecdote with most votes
      </h1>
      {mostVoted()}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)