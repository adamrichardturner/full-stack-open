const CountriesList = ({ countries }) => {
    const countriesToShow = countries.map(country => <p key={country.name.official}>{country.name.common}</p>)
    return (
        <>
            {countriesToShow}
        </>
    )
}

export default CountriesList