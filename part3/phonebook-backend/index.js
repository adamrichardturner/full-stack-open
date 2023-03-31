const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const process = require('process')
const Person = require('./models/person')

// Set up middleware
app.use(cors()) // enable cors
app.use(express.json()) // Parse request body
app.use(express.static('build')) // Return static files in build directory

// Define a new morgan token to log the request body
morgan.token('req-body', (req) => JSON.stringify(req.body))

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
) // Log incoming requests

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  // Get request to output persons as JSON
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  // Find a person by id and respond with JSON
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  // Add a person to the phonebook database
  const body = request.body
  Person.find({ name: body.name }).then((res) => {
    console.log(res)
  })

  if (body.name === undefined) {
    return response.status(400).json({ error: 'missing name' })
  } else if (body.number === undefined) {
    return response.status(400).json({ error: 'missing number' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  // Delete a person from the phonebook
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', response => {
  Person.countDocuments({})
    .then((count) => {
      const info = `Phonebook has info for ${count} people<br/><br/>`
      const date = new Date().toString()
      response.send(info + date)
    })
    .catch(() => {
      response.status(500).send({ error: 'Failed to get the count of persons' })
    })
})

// Handle unknown endpoints
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
