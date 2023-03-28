const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

// Set up middleware
app.use(cors()) // enable cors
app.use(express.json()) // Parse request body
app.use(express.static('build')) // Return static files in build directory

// Define a new morgan token to log the request body
morgan.token('req-body', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body')); // Log incoming requests

let persons = [
    // { 
    //   "id": 1,
    //   "name": "Arto Hellas", 
    //   "number": "040-123456"
    // },
    // { 
    //   "id": 2,
    //   "name": "Ada Lovelace", 
    //   "number": "39-44-5323523"
    // },
    // { 
    //   "id": 3,
    //   "name": "Dan Abramov", 
    //   "number": "12-43-234345"
    // },
    // { 
    //   "id": 4,
    //   "name": "Mary Poppendieck", 
    //   "number": "39-23-6423122"
    // }
]

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
    // Get request to output persons as JSON
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    // Find a person by id and respond with JSON
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

app.post('/api/persons', (request, response) => {
  // Add a person to the phonebook
  const body = request.body
  Person.find({ name: body.name }).then(res => {
    console.log(res)
  })
  console.log(`duplicate is ${duplicate}`)

  if(body.name === undefined) {
    return response.status(400).json({ error: 'missing name' })
  } else if (body.number === undefined) {
    return response.status(400).json({ error: 'missing number' })
  }
  // } else if (Person.find({ name: body.name })) {
  //   return response.status(400).json({ error: 'name must be unique' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  console.log(`person is ${person}`)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    // Delete a person from the phonebook
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})



app.get('/info', (request, response) => {
    // Give general info on the status of the phonebook
    const count = Person.countDocuments({})
    const info = `Phonebook has info for ${count} people<br/><br/>`
    const date = new Date().toString()
    response.send(info + date)
})

// Handle unknown endpoints
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})