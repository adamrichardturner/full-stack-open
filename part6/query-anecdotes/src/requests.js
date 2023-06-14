import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    return Promise.reject(
      new Error('Anecdote content must be 5 or more characters in length.')
    )
  }

  return axios
    .post(baseUrl, newAnecdote)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('An error occurred while creating the anecdote.')
    })
}

export const updateVotes = ({content, id, votes}) => {
    const obj = {
        content,
        id,
        votes: votes + 1
    }
    return axios.put(`${baseUrl}/${id}`, obj).then(res => res.data)
}
