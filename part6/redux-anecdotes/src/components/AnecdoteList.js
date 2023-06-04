import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      console.log(anecdotes)
      const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
      if(filter) {
        return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      }
      return sortedAnecdotes
    })
    const dispatch = useDispatch()
    const handleVote = (id) => {
    dispatch(vote(id))
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