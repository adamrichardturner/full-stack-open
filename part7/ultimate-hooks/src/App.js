import { useState, useEffect } from 'react'
import axios from 'axios'

// Custom hook for managing the state of an input field
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

// Custom hook for handling CRUD operations for a resource
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // Fetch initial data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    fetchData()
  }, [baseUrl])

  // Function to fetch the data for the resource
  const read = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  // Function to create a new resource
  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources([...resources, response.data])
  }

  const service = {
    read,
    create,
  }

  return [resources, service]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  // Event handler for submitting a new note
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  // Event handler for submitting a new person
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
