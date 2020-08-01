import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])
  
  /** 
   * Adds new person to state
   * @param {submit event} event 
   */
  const addPerson = (event) => {
    event.preventDefault();

    if (newName === '') {
      window.alert(`Please type a name to add`);
      return;
    }

    else if (newNumber === '') {
      window.alert(`Please type a number to add`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to ` +
        `the phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== returnedPerson.id ? person : returnedPerson
            ))
            setNewName('');
            setNewNumber('');
          })
      }
    }

    else {
      personService
        .create(nameObject)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  /**
   * Sets new name state on input change
   * @param {name input onChange event} event 
   */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  /**
   * Sets new number state on input change
   * @param {number input onChange event} event 
   */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  /** 
   * Sets filter state on input change
   * @param {filter input onChange event} event 
  */
 const handleFilterChange = (event) => {
  setFilter(event.target.value);
}

/**
 * Handles delete person click
 * @param {person} person 
 */
const handleDeleteClick = (person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    personService
    .deletePerson(person.id)
    .catch(error => {
      alert(
        `the person '${person.name} was already deleted from server`
      )
    })
    setPersons(persons.filter(p => p.id !== person.id))
  }
}

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange} 
      />

      <h2>Add a new</h2>

      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Persons 
        persons={persons}
        filter={filter}
        handleDeleteClick={handleDeleteClick} 
      />
    </div>
  )
}

export default App