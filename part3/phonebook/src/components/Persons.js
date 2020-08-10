import React from 'react'

const Persons = ({ persons, nameFilter, handleDeleteClick }) => {
  return (
    <div>
      {persons.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      ).map(person => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
            <button 
              onClick={() => handleDeleteClick(person)}>
                delete
            </button>
          </div>
        )
      }
      )}
    </div>
  )
}

export default Persons