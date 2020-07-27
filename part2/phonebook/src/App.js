import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  /** 
   * Adds new person to state
   * @param {submit event} event 
   */
  const addPerson = (event) => {
    event.preventDefault();

    let personExists = false;
    persons.forEach(person => {
      if (person.name === newName)
        personExists = true;
    });

    if (newName === '') {
      window.alert(`Please type a name to add`);
    }

    else if (newNumber === '') {
      window.alert(`Please type a number to add`);
    }

    else if (personExists) {
      window.alert(`${newName} is already added to phonebook`);
    }

    else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        persons={persons} setPersons={setPersons}
        addPerson={addPerson} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App