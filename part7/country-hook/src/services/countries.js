import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountry = (name) => {
  const response = axios.get(`${baseUrl}/${name}`)
  return response.data
}

export { getCountry }