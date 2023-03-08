import StatisticsLine from "./StatisticsLine"

const Statistics = ({good, neutral, bad}) => {
    const badPoints = bad * -1
    if(good === 0 && neutral === 0 && bad === 0) {
        return(<p>No feedback given</p>)
    } else {
        return (
            <>
              <p>
                <StatisticsLine text="good" value={good}/><br />
                <StatisticsLine text="neutral" value={neutral}/><br />
                <StatisticsLine text="bad" value={bad}/><br />
                <StatisticsLine text="all" value={good + neutral + bad}/><br />
                <StatisticsLine text="average" value={(good + badPoints) / 2}/><br />
                <StatisticsLine text="positive" value={(good / (good + neutral + bad)) * 100}/>%<br />
              </p>
            </>
        )
    }
}

export default Statistics