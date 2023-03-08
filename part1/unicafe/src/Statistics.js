const Statistics = ({good, neutral, bad}) => {
    const badPoints = bad * -1
    return (
        <>
          <h2>statistics</h2>
          <p>
            good {good}<br />
            neutral {neutral}<br />
            bad {bad}<br />
            all {good + neutral + bad}<br />
            average {(good + badPoints) / 2}<br />
            positive {(good / (good + neutral + bad)) * 100}%
          </p>
        </>
    )
}

export default Statistics