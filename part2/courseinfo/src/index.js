import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = ({ parts }) => {
  let total = 0;
  return (
    <div>
      {parts.map(part => {
        total += part.exercises;
        return <Part key={part.id} name={part.name} exercises={part.exercises} />
      })}
      <b>
        total of {total} exercises
      </b>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 100,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Bird Law',
        exercises: 14,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))