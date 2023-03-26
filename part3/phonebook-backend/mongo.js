const mongoose = require('mongoose')

// Terminate process if password not given
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
  }

// Helper functions
const getAll = () => {
    // Search Person object and log the name and number
    // for each person
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

const addPerson = (name, number) => {
    // Add a new person to the database
    const person = new Person({
        name: name,
        number: number,
      })
      
      person.save().then(result => {
        console.log(`added ${name} number ${number}`)
        mongoose.connection.close()
      })
}

// Initialise command line inputs
const password = process.argv[2] 
const name = process.argv[3] || null
const number = process.argv[4] || null

const url =
  `mongodb+srv://fsphonebook:${password}@cluster1.g9nkl3w.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define schema for a person here
const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Define model for the Person scheme here
const Person = mongoose.model('Person', personsSchema)

// If only password supplied as argument, call getAll
if (process.argv.length == 3) {
    return getAll()
}

// Otherwise, if more than 3 arguments supplied, addPerson
addPerson(name, number)