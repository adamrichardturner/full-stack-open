const CountryDetail = ({country}) => {
    const name = country.name.common
    const capital = country.capital
    const area = country.area
    const languages = Object.values(country.languages)
    const languagesToShow = languages.map(language => <li key={language}>{language}</li>)
    const flag = country.flags
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
        </>
    )
}

export default CountryDetail