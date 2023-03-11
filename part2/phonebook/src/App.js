import { useState } from 'react'

const App = () => {
  // Manage persons in phonebook state here
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567' 
    }
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
  // Handle submit of the form here
  const handleSubmit = e => {
    e.preventDefault()
    // If newName is in persons, add it to an array in nameExists
    const nameExists = persons.filter(person => person.name === newName)
    // If nameExists has a length of 0, this is a unique name, we should
    // add it to the persons array in state
    if(nameExists.length === 0) {
      // Store in newPerson an object to be added to persons state array
      const newPerson = { name: newName, number: newNumber }
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
  // Store in displayPersons an array of persons
  const displayPersons = persons.map(person => (
                            <p key={person.name}style={{margin: 0}}>
                              {person.name} {person.number}
                            </p>)
                          )

  return (
    <div>
      <h2>Phonebook</h2>
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
      {displayPersons}
    </div>
  )
}

export default App