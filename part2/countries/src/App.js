import { useState, useEffect } from 'react'
import RenderCountries from './RenderCountries'
import countriesService from './services/countries'

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

  const handleSearch = e => {
    // Handle search for countries and filter countries by searhTerm
    const term = e.target.value
    // Store in filtered countries in state that include term
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(term) ? true : false
    )
    setSearchTerm(term)
    setFilteredCountries(filtered)
  }


  return (
    <>
      <p style={{display: 'inline', marginRight: 5}}>find countries</p>
      <input 
          value={searchTerm} 
          onChange={handleSearch}>
      </input>
      <RenderCountries countries={filteredCountries}/>
    </>
  )
}

export default App;