import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ text, value} ) => {
  // const all = good + neutral + bad;
  // if (all === 0) {
  //   return (
  //     <div>
  //       <div>
  //         No feedback given
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div>
      {text} {value}
    </div>
    // <div>
    //   <div>
    //     good {good}
    //   </div>
    //   <div>
    //     neutral {neutral}
    //   </div>
    //   <div>
    //     bad {bad}
    //   </div>
    //   <div>
    //     all {all}
    //   </div>
    //   <div>
    //     average {all > 0 ? ((good * 1) + (bad * -1)) / all : '0'}
    //   </div>
    //   <div>
    //     positive {all > 0 ? (good * 100) / all : '0'}%
    //   </div>
    // </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;
  let statistics;
  if (all > 0) {
    statistics = (
      <div>
        <Statistics text="good" value={good}/>
        <Statistics text="neutral" value={neutral}/>
        <Statistics text="bad" value={bad}/>
        <Statistics text="all" value={all}/>
        <Statistics text="average" value={all > 0 ? ((good * 1) + (bad * -1)) / all : '0'}/>
        <Statistics text="positive" value={(all > 0 ? (good * 100) / all : '0') + '%'}/> 
      </div>
    );
  }
  else {
    statistics = (
      <div>
        No feedback given
      </div>
    );
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      {statistics}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)