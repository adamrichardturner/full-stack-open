import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
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
   
  const [selected, setSelected] = useState(0)
  const handleAnecdote = e => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    console.log(rand)
    return setSelected(rand)
  }
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleButtonState = (e) => {
    if(e.target.name === "good") {
      const count = good + 1
      setGood(count)
    } else if (e.target.name === "neutral") {
      const count = neutral + 1
      setNeutral(count)
    } else if (e.target.name === "bad") {
      const count = bad + 1
      setBad(count)
    }
  }
  return (
    <>
      <Header />
      <Button name="good" 
              handleButtonState={handleButtonState}>
      </Button>
      <Button name="neutral" 
              handleButtonState={handleButtonState}>
      </Button>
      <Button name="bad" 
              handleButtonState={handleButtonState}>
      </Button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <div>
        {anecdotes[selected]}<br />
        <button onClick={handleAnecdote}>next anecdote</button>
      </div>
    </>
  )
}

export default App