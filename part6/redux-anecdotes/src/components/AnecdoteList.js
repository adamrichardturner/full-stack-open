import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
      if(filter) {
        return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      }
      return sortedAnecdotes
    })
    const dispatch = useDispatch()
    const vote = (id) => {
    dispatch(newVote(id))
    // Fixing commits
    }
    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
    )
}

export default AnecdoteList