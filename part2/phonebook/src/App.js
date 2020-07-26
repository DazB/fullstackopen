import React, { useState } from 'react'

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
   * Checks if the submitted name already exists.
   * If not, adds to state
   * @param {submit event} event 
   */
  const addPerson = (event) => {
    event.preventDefault();

    let personExists = false;
    persons.forEach(person => {
      if (person.name === newName)
        personExists = true;
    });

    if (!personExists) {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }

    else {
      window.alert(`${newName} is already added to phonebook`);
    }
  }

  /**
   * Sets filter state on input change
   * @param {filter input onChange event} event 
   */
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={filter}
          onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* Filters numbers to show based on filter text */}
      {persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App