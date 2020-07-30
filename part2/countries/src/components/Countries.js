import React from 'react'
import Country from './Country'

const Countries = ({ filteredCountries, setFilteredCountries }) => {
  
  // Too many countries
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  // No countries
  if (filteredCountries.length === 0) {
    return (
      <div>
        No countries found
      </div>
    )    
  }

  // One country
  if (filteredCountries.length === 1) {
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    )
  }
  
  // List matched countries 
  return (
    <div>
      {filteredCountries.map(country => {
        return (
        <div key={country.name}>
          {country.name}
          <button onClick={() => setFilteredCountries([country])}>show</button>
        </div>
        )
    })}
    </div>
  )
}

export default Countries
