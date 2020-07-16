import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return (
      <div>
        <div>
          No feedback given
        </div>
      </div>
    )
  }
  return (
    <div>
      <div>
        good {good}
      </div>
      <div>
        neutral {neutral}
      </div>
      <div>
        bad {bad}
      </div>
      <div>
        all {all}
      </div>
      <div>
        average {all > 0 ? ((good * 1) + (bad * -1)) / all : '0'}
      </div>
      <div>
        positive {all > 0 ? (good * 100) / all : '0'}%
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)