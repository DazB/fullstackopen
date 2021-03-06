import React, { useState, useEffect } from 'react'
import NameFilter from './components/NameFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState({
    text: null,
    error: false,
    timeout: null,
  });

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
          .catch(error => {
            clearTimeout(message.timeout);
            setMessage({
              text: `Information of ${existingPerson.name} has already been removed from server`,
              error: true,
              timeout: setTimeout(() => {
                setMessage({
                  text: null,
                  error: false
                })          
              }, 5000)
            })
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
        
        clearTimeout(message.timeout);
        setMessage({
          text: `Changed ${nameObject.name}`,
          error: false,
          timeout: setTimeout(() => {
            setMessage({
              text: null,
              error: false
            })          
          }, 5000)
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
      
      clearTimeout(message.timeout);
      setMessage({
        text: `Added ${nameObject.name}`,
        error: false,
        timeout: setTimeout(() => {
          setMessage({
            text: null,
            error: false
          })          
        }, 5000)
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
  setNameFilter(event.target.value);
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
      clearTimeout(message.timeout);
      setMessage({
        text: `Information of ${person.name} has already been removed from server`,
        error: true,
        timeout: setTimeout(() => {
          setMessage({
            text: null,
            error: false
          })          
        }, 5000)
      })
    })
    setPersons(persons.filter(p => p.id !== person.id))
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} error={message.error}/>
      <NameFilter 
        filter={nameFilter}
        handleFilterChange={handleFilterChange} 
      />

      <h2>Add a new</h2>

      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Persons 
        persons={persons}
        nameFilter={nameFilter}
        handleDeleteClick={handleDeleteClick} 
      />
    </div>
  )
}

export default App