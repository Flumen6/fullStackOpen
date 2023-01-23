import { useState, useEffect } from 'react'
import serv from './serv/serv'

const App = () => {
  const[input, setInput] = useState('')
  const[countries, setCountries] = useState([])
  const[selected, setSelected] = useState([])
  const[weather, setWeather] = useState(null)

  useEffect(()=> {
    serv.get()
      .then(res => {
        setCountries(res)
      })
  }, [])

  useEffect(()=> {
    setSelected(countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase())))
  }, [input])

  useEffect(()=> {
    if (selected.length == 1) {
      const es = selected[0]
      serv.getWeather(es.latlng[0], es.latlng[1])
        .then(res => {
          setWeather(res)
        })
    }
  }, [selected])
  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleShow = (country) => {
    setSelected([country])
  }

  if (selected.length > 10 ) {
    return(
      <>
        find countries: <input value={input} onChange={handleChange}></input>
        <div>Too many matches</div>
      </>
    );
  } else if (selected.length === 1 && weather) {
    const country = selected[0];
    const lang = Object.entries(country.languages);
    return(
      <>
        find countries: <input value={input} onChange={handleChange}></input>
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h4>Languages:</h4>
          <ul>
            {lang.map(l => <li key={l[1]}>{l[1]}</li>)}
          </ul>
          <img src={country.flags.png}></img>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature {Math.round((weather.main.temp - 273.15) * 100) / 100}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      </>
    );
  } else {
    return(
      <>
      find countries: <input value={input} onChange={handleChange}></input>
        <ul>
          {
            selected.map(country => {
              return(
                <>
                  <li key={country.name.common}>{country.name.common}</li>
                  <button onClick={() => handleShow(country)}>Show</button>
                </>
              );
            })
          }
          
        </ul>
      </>
    );
   
  }
}

export default App