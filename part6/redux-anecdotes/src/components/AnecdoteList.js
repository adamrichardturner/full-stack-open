import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
      if(filter) {
        return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      }
      return sortedAnecdotes
    })
    const dispatch = useDispatch()
    const handleVote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    console.log(anecdote)
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    }
    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
    )
}

export default AnecdoteList