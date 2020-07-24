import React from 'react'

const Header = (props) => {
	return (
		<h1>
			{props.course}
		</h1>
	)
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  // Sums all the exercise numbers
  const total = parts.reduce((total, currentPart) => total + currentPart.exercises, 0);

  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <b>
        total of {total} exercises
      </b>
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
)

export default Course