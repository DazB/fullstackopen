import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState({
    current: {
      temperature: "",
      weather_icons: [""],
      wind_speed: "",
      wind_dir: "",
    }
  })

  // Gets weather
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }
    axios
      .get("http://api.weatherstack.com/current", {params})
      .then(response => {
        setWeather(response.data);
      })
  }, [country.capital])

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
      <h2>
        Weather in {country.capital}
      </h2>
      <div>
        <b>temperature: </b> {weather.current.temperature} Celcius
      </div>
      <img src={weather.current.weather_icons[0]} alt={"Weather icon"} />
      <div>
        <b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </div>
    </div>
  )
}

export default Country
