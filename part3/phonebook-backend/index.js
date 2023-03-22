const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    // Get request to output persons as JSON
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  // Find a person by id and respond with JSON
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  // Delete a person from the phonebook
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  // Give general info on the status of the phonebook
  const info = `Phonebook has info for ${persons.length} people<br/><br/>`
  const date = new Date().toString()
  response.send(info + date)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})