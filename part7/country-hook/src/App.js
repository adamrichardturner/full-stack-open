import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountry = async (name) => {
  const response = await axios.get(`${baseUrl}${name}`)
  return response.data
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        const response = await getCountry(name)
        setCountry(response)
      }
    }
    fetchData()
  }, [name])
  return {
    country,
  }
}

const Country = ({ country }) => {
  const { name, population, flags } = country
  const capitalCity = country.capital[0]
  if (!country) {
    return null
  }

  if (!name) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{name.official} </h3>
      <div>capital {capitalCity} </div>
      <div>population {population}</div>
      <img
        src={flags.png}
        height="100"
        alt={`flag of ${country.name.official}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const {country} = useCountry(name)
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {country ? <Country country={country} /> : null}
    </div>
  )
}

export default App
