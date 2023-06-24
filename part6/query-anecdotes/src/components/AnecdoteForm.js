import { useContext } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { createAnecdote } from '../requests'
import { NotificationContext } from '../NotificationContext'

// Helper Functions
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatchNotification } = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      console.error('Anecdote content must be at least 5 characters long')
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(asObject(content))
    dispatchNotification({
      type: 'SHOW_NOTIFICATION',
      payload: `Created anecdote: ${content}`,
    })
    setTimeout(() => {
      dispatchNotification({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
