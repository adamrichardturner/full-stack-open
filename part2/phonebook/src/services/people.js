import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newPerson, maxId) => {
    newPerson.id = maxId + 1
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const updateNumber = (id, number) => {
    const newNumber = { number: number }
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    request.then(response => response)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    createPerson,
    updateNumber,
    deletePerson
}