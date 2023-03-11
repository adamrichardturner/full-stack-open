const Search = ({searchTerm, handleSearch}) => {
    return (
        <div>
            <p>filter shown with </p>
            <input value={searchTerm} onChange={handleSearch}/>
        </div>
    )
}

export default Search