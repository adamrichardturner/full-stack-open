import { useState, useEffect } from 'react'
import { getCountry } from '../services/countries'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    setCountry(() => getCountry(name))
  }, [country, name])
  return {
    country,
  }
}
