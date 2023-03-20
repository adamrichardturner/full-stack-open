const CountryDetail = ({ country, weather }) => {
    const name = country && country.name.common
    const capital = country && country.capital
    const area = country && country.area
    const languages = country && Object.values(country.languages)
    const languagesToShow = country && languages.map(language => <li key={language}>{language}</li>)
    const flag = country && country.flags
    // Weather details
    const temp = weather && weather.main.temp
    const wind = weather && weather.wind.speed
    const weatherImg = weather && weather.weather[0].icon
    const icon = weather && `https://openweathermap.org/img/wn/${weatherImg}@2x.png`
    if(!country) {
        return null
    }
    return (
        <>
            <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <strong>languages:</strong>
            <ul>
                {languagesToShow}
            </ul>
            {flag ? <img src={flag.png} alt={name}/> : null}
            <h3>Weather in {capital}</h3>
            <p>temperature {temp} Celsius</p>
            <img src={icon} alt={name} />
            <p>wind {wind} m/s</p>
        </>
    )
}

export default CountryDetail