import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // handles button state
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
    </>
  )
}

export default App