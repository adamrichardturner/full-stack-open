import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const getWeather = (lat, lon) => {
    const query = `?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    const request = axios.get(baseUrl + query)
    return request.then(response => response.data)
}

const weatherService = { getWeather }

export default weatherService