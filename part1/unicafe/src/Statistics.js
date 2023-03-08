const Statistics = ({good, neutral, bad}) => {
    const badPoints = bad * -1
    if(good === 0 && neutral === 0 && bad === 0) {
        return(<p>No feedback given</p>)
    } else {
        return (
            <>
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
}

export default Statistics