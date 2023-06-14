import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateVotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateVotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
