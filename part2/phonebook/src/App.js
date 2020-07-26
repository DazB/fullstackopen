import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '0208-440-0791',
    }
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

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
      {persons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App