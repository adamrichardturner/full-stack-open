import CountriesList from './CountriesList'
import CountryDetail from './CountryDetail'

const RenderCountries = ({countries}) => {
    if (!countries) {
        return null
    } else if (countries.length > 1 && countries.length <= 10) {
        return (<CountriesList countries={countries} />)
    } else if (countries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    } else {
        return (<CountryDetail country={countries[0]} />)
    }
}

export default RenderCountries