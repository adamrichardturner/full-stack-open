/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getSingle = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const createPerson = (newPerson, maxId) => {
    const newPersonObj = {
        id: newPerson.id = maxId + 1,
        name: newPerson.name,
        number: newPerson.number
    }
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const updateNumber = (id, name, number) => {
    const newNumber = { id: id, name: name, number: number }
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    return request.then(response => response)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const peopleService = {
    getAll,
    getSingle,
    createPerson,
    updateNumber,
    deletePerson
}

export default peopleService