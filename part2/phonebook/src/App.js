import { useState, useEffect } from 'react'
import peopleService from './services/people'
import Search from './Search'
import UpdatePhoneBook from './UpdatePhoneBook'
import People from './People'
import Notification from './Notification'

const App = () => {
  // Manage persons in phonebook state here
  const [persons, setPersons] = useState(['Phonebook data being fetched'])
  // Initial axios call to get people from directory
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
    setSearchTerm(term)
  }
  // Manage error state here
  const [notification, setNotification] = useState(null)
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
          setNotification({
            notification: `Added ${returnedPerson.name}`,
            type: 'positive'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification({
            notification: error.response.data.error,
            type: 'negative'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')
    }
    const updateNumber = () => {
      // Update phone number
      const personIndex = persons.findIndex(person => person.name === newName)
      const {id, name} = persons[personIndex]
      const updatedPerson = {id: id, name: name, number: newNumber}
      peopleService.getSingle(id).then(response => {
        if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          peopleService.updateNumber(id, newName, newNumber)
              .then(returnedPerson => {
                  setPersons(prevPersons => {
                    const updatedPersons = [...prevPersons]
                    updatedPersons[personIndex] = updatedPerson
                    return updatedPersons
                  })
                  setNotification({
                    notification: `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`,
                    type: 'positive'
                  })
                  setTimeout(() => {
                    setNotification(null)
                  }, 5000)
                  setNewName('')
                  setNewNumber('')
                })
        }
      }).catch(error => {
        if(error.response.status === 404) {
          setPersons(prevPersons => {
            return [...prevPersons.filter(person => person.id !== id)]
          })
          setNotification({
            notification: `Information of ${newName} has already been removed from server`,
            type: 'negative'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }
        console.log(error)
      })
    } 
    // If newName is in persons, add it to an array in nameExists
    const nameExists = persons.filter(person => person.name === newName)
    // If nameExists has a length of 0, this is a unique name, we should
    // add it to the persons array in state
    if(nameExists.length === 0) {
      // Add person to backend JSON
      addPerson(newPerson)
    // Else if nameExists contains duplicated name, alert the user it is
    // already in the phonebook
    } else {
      updateNumber(newPerson)
    }
  }
  // Handle delete button
  const handleDelete = id => {
    const personId = persons.findIndex(person => person.id === id)
    const personObj = persons[personId]
    if(window.confirm(`Do you really want to delete ${personObj.name}`)) {
      peopleService
        .deletePerson(id)
      setPersons(prevPersons => {
        return [...prevPersons.filter(person => person.id !== id)]
      })
      setNotification({
        notification: `Deleted ${personObj.name} from the phonebook`,
        type: 'negative'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  // Store in personsToShow an array of persons with name and number
  // If searchTerm is false, return just the persons array
  // Else filter it to only include persons with names including searchTerm
  const personsToShow = !searchTerm
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Search searchTerm={searchTerm} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <UpdatePhoneBook handleSubmit={handleSubmit} 
                       newName={newName} 
                       handleName={handleName} 
                       newNumber={newNumber} 
                       handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <People personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App