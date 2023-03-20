import CountryDetail from './CountryDetail'

const CountriesList = ({ countries, handleSelectedCountry, selectedCountry, weather }) => {
    const countriesToShow = countries.map(country => (
        <div key={country.name.common}>
            <li style={{listStyle: 'none'}}>
                <p style={{display: 'inline', marginRight: 5}}>{country.name.common}</p>
                <button onClick={() => handleSelectedCountry(country.name.common)}>{
                selectedCountry.isClicked && selectedCountry.countryClicked === country.name.common 
                                                                            ? 'hide' 
                                                                            : 'show'
                                                                        }
                </button>
                {selectedCountry.isClicked && selectedCountry.countryClicked === country.name.common 
                    ? <CountryDetail country={country} weather={weather}/> 
                    : null
                }
            </li>
        </div>
    ))
    return (
        <>
            {countriesToShow}
        </>
    )
}

export default CountriesList