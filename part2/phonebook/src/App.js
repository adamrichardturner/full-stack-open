import { useState } from 'react'

const App = () => {
  // Manage persons in phonebook state here
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  // Manage newName additions here
  const [newName, setNewName] = useState('')
  // Handle the form input for adding a name
  const handleName = e => {
    const name = e.target.value
    setNewName(name)
  }
  // Manage newNumber additions here
  const [newNumber, setNewNumber] = useState('')
  // Handle the form input for adding a number
  const handleNumber = e => {
    const number = e.target.value
    setNewNumber(number)
  }
  // Manage search state here
  const [searchTerm, setSearchTerm] = useState('')
  // Handle the search input
  const handleSearch = e => {
    const term = e.target.value
    setSearchTerm(term.toLowerCase())
  }
  // Handle submit of the form here
  const handleSubmit = e => {
    e.preventDefault()
    // If newName is in persons, add it to an array in nameExists
    const nameExists = persons.filter(person => person.name === newName)
    // If nameExists has a length of 0, this is a unique name, we should
    // add it to the persons array in state
    if(nameExists.length === 0) {
      // Get all ids from persons
      const ids = persons.map(person => person.id)
      // Generate unique id for new person object by adding 1 to the max
      // of the existing ids
      const newId = Math.max(...ids) + 1
      // Store in newPerson an object to be added to persons state array
      const newPerson = { name: newName, number: newNumber, id: newId }
      // Update persons array with newPerson concatenated to it
      setPersons(prevPersons =>(prevPersons.concat(newPerson)))
      // Reset newName state to empty string to reflect form submission
      setNewName('')
    // Else if nameExists contains duplicated name, alert the user it is
    // already in the phonebook
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  // Store in personsToShow an array of persons with name and number
  // If searchTerm is false, return just the persons array
  // Else filter it to only include persons with names including searchTerm
  const personsToShow = !searchTerm
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with </p>
        <input value={searchTerm} onChange={handleSearch}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => (<p key={person.id}>{person.name} {person.number}</p>))}
    </div>
  )
}

export default App