import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const addVote = async (anecdote) => {
    const id = anecdote.id
    const obj = {
        content: anecdote.content,
        id: anecdote.id,
        votes: anecdote.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, obj)
    return response.data
}

export default {
    getAll,
    createNew,
    addVote
}