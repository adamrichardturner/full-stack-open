const express = require('express')
const morgan = require('morgan');
const cors = require('cors')

const app = express()

// Set up middleware
app.use(cors()) // enable cors
app.use(express.json()) // Parse request body
app.use(express.static('build')) // Return static files in build directory

// Define a new morgan token to log the request body
morgan.token('req-body', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body')); // Log incoming requests

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

// Helper functions
const generatedId = () => {
    return Math.floor(Math.random() * 1000)
}

app.get('/api/persons', (request, response) => {
    // Get request to output persons as JSON
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    // Find a person by id and respond with JSON
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    // Delete a person from the phonebook
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  // Add a person to the phonebook
    const {name, number} = request.body
    const duplicate = persons.find(person => person.name === name)
    const id = generatedId()
    if(!name) {
      return response.status(400).json({
        error: 'missing name'
      })
    } else if (!number) {
      return response.status(400).json({
        error: 'missing number'
      })
    } else if (duplicate) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = {
      id,
      name,
      number
    }
    persons = persons.concat(person)

    response.json(person)
})

app.get('/info', (request, response) => {
    // Give general info on the status of the phonebook
    const info = `Phonebook has info for ${persons.length} people<br/><br/>`
    const date = new Date().toString()
    response.send(info + date)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})