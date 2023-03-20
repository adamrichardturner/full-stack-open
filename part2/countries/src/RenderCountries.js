import CountriesList from './CountriesList'
import CountryDetail from './CountryDetail'

const RenderCountries = ({countries, selectedCountry, handleSelectedCountry, weather}) => {
    if (!countries) {
        return null
    } else if (countries.length > 1 && countries.length <= 10) {
        return (<CountriesList countries={countries} handleSelectedCountry={handleSelectedCountry} selectedCountry={selectedCountry} weather={weather}/>)
    } else if (countries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    } else {
        return (<CountryDetail country={countries[0]} weather={weather}/>)
    }
}

export default RenderCountries