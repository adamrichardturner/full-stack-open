import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    if (filter) {
      return sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    }
    return sortedAnecdotes
  })
  const dispatch = useDispatch()

  const handleVote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(updateVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
