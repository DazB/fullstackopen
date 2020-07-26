import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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