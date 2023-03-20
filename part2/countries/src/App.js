import { useState, useEffect } from 'react'
import RenderCountries from './RenderCountries'
import countriesService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  // Store countries state here
  const [countries, setCountries] = useState(null)

  // Get all country data and store in state
  useEffect(() => {
    countriesService
    .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  // Store search state here
  const [searchTerm, setSearchTerm] = useState('')

  // Store filtered countries here
  const [filteredCountries, setFilteredCountries] = useState(null)

  // Store click state and country data here
  const [selectedCountry, setSelectedCountry] = useState({isClicked: false, countryClicked: null})

  // Store weather data here for selected country
  const [weather, setWeather] = useState(null)

  const handleSearch = e => {
    // Handle search for countries and filter countries by search term
    const term = e.target.value
    // Store in filtered countries in state that include term
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(term) ? true : false
    )
    setSearchTerm(term)
    setFilteredCountries(filtered)
    if(filtered.length === 1) {
      setSelectedCountry({
        isClicked: false,
        countryClicked: filtered[0]
      })
    }
  }

  const handleSelectedCountry = selected => {
    // Handle setting selected country and getting
    // weather data for selected country
    getWeather(selected)
    setSelectedCountry(prev => {
      return {
        ...prev,
        isClicked: !prev.isClicked,
        countryClicked: selected
      }
    })
  }

  const getWeather = selected => {
    // Get weather data for selected country
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(selected.toLowerCase()) ? true : false
    )[0]
    const [lat, lon] = filtered.capitalInfo.latlng
    weatherService
    .getWeather(lat, lon)
      .then(response => {
        setWeather(response)
      })
  }

  return (
    <>
      <p style={{display: 'inline', marginRight: 5}}>find countries</p>
      <input 
          value={searchTerm} 
          onChange={handleSearch}>
      </input>
      <RenderCountries 
          countries={filteredCountries} 
          selectedCountry={selectedCountry} 
          handleSelectedCountry={handleSelectedCountry} 
          weather={weather}
      />
    </>
  )
}

export default App;