import { useState } from 'react'
import Votes from './Votes'

const App = () => {
  // Store anecdotes here
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // Manage the selected anecdote state here
  const [selected, setSelected] = useState(0)
  // Handle clicks to randomly select an anecdote
  const handleAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    return setSelected(rand)
  }
  // Managed points for votes on anecdote selected here
  // Initialised to a 0 filled array of the same length of anecdotes array
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  // Handle votes
  const handleVote = () => {
      // Do not mutate existing state!
      return setPoints(prevPoints => {
        const newPoints = [...prevPoints]
        newPoints[selected] += 1
        return newPoints;
      })
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br/>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleAnecdote}>next anecdote</button><br />
      {Math.max(...points) !== 0 ? <Votes anecdotes={anecdotes} points={points}/> : <p>Please vote</p>}
    </div>
  )
}

export default App