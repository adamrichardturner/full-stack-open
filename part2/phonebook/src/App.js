import { useState } from 'react'

const App = () => {
  // Manage persons in phonebook state here
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  // Manage newName additions here
  const [newName, setNewName] = useState('')
  // Handle the form input for adding a name
  const handleName = (e) => {
    const name = e.target.value
    setNewName(name)
  }
  // Handle submit of the form here
  const handleSubmit = (e) => {
    e.preventDefault()
    // Store in newPerson an object to be added to persons state array
    const newPerson = { name: newName }
    // Update persons array with newPerson concatenated to it
    setPersons(prevPersons =>(prevPersons.concat(newPerson)))
    // Reset newName state to empty string to reflect form submission
    setNewName('')
  }
  // Store in displayPersons an array of persons
  const displayPersons = persons.map(person => (
                            <p key={person.name}style={{margin: 0}}>
                              {person.name}
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayPersons}
    </div>
  )
}

export default App