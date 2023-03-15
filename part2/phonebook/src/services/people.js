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

const updatePerson = (id, newPerson) => {
    const request = axios.push(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

export default {
    getAll,
    createPerson,
    updatePerson
}