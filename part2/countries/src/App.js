import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [filter, setNewFilter] = useState('');
  const [countries, setCountries] = useState([]);

  // Effect hook. Executed once when the component is rendered
  // Gets all countries
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }


  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App;
