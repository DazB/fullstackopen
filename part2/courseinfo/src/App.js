import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {
  return (
    <div>
      {/* Goes through each element in array of courses.
      Puts it into Course component */}
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App