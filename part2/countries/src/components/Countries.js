import React from 'react'

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
    const country = filteredCountries[0];
    return (
      <div>
        <h1>
          {country.name}
        </h1>
        <div>
          captial {country.capital}
        </div>
        <div>
          population {country.population}
        </div>
        <h2>
          languages
        </h2>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>
              {language.name}
            </li>
          ))}
        </ul>
        <img src={country.flag} alt={"Flag of " + country.name} height="100" />
      </div>
    )
  }
  // List matched countries 
  return (
    <div>
      {filteredCountries.map(country => {
        console.log(country)
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
