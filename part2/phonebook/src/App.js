import { useState, useEffect } from 'react'
import peopleService from './services/people'
import Search from './Search'
import UpdatePhoneBook from './UpdatePhoneBook'
import People from './People'

const App = () => {
  // Manage persons in phonebook state here
  const [persons, setPersons] = useState(['Phonebook data being fetched'])

  // Initial axios call to db.json
  useEffect(() => {
    peopleService
      .getAll()
      .then(response => setPersons(response))
  }, [])

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
    // Store maxId here for generating new Id on backend
    const maxId = Math.max(persons.map(person => person.id))
    // Store in newPerson an object to be added to persons
    const newPerson = { name: newName, number: newNumber}
    const addPerson = newPerson => {
      // Add person to backend JSON
      peopleService
        .createPerson(newPerson, maxId)
        .then(returnedPerson => {
          setPersons(prevPersons => [...prevPersons, returnedPerson])
        })
    }
    // If newName is in persons, add it to an array in nameExists
    const nameExists = persons.filter(person => person.name === newName)
    // If nameExists has a length of 0, this is a unique name, we should
    // add it to the persons array in state
    if(nameExists.length === 0) {
      // Add person to backend JSON
      addPerson(newPerson)
      // Reset newName state to empty string to reflect form submission
      setNewName('')
      setNewNumber('')
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
      <Search searchTerm={searchTerm} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <UpdatePhoneBook handleSubmit={handleSubmit} 
                       newName={newName} 
                       handleName={handleName} 
                       newNumber={newNumber} 
                       handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <People personsToShow={personsToShow}/>
    </div>
  )
}

export default App