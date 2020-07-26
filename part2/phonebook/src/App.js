import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  /**
   * Checks if the submitted name already exists.
   * If not, adds to state
   * @param {submit event} event 
   */
  const addName = (event) => {
    event.preventDefault();
    
    let personExists = false; 
    persons.forEach(person => {
      if (person.name === newName)
        personExists = true;
    });

    if (!personExists) {
      const nameObject = {
        name: newName,
      }

      setPersons(persons.concat(nameObject));
      setNewName('');
    }

    else {
      window.alert(`${newName} is already added to phonebook`);
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App