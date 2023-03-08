import StatisticsLine from "./StatisticsLine"

const Statistics = ({good, neutral, bad}) => {
    // badPoints stores our bad points for average calculation
    const badPoints = bad * -1
    // conditional render if no button has been pressed
    if(good === 0 && neutral === 0 && bad === 0) {
        return(<p>No feedback given</p>)
    } else {
        return (
            <>
              <p>
                <table>
                    <tr><StatisticsLine text="good" value={good}/><br /></tr>
                    <tr><StatisticsLine text="neutral" value={neutral}/><br /></tr>
                    <tr><StatisticsLine text="bad" value={bad}/><br /></tr>
                    <tr><StatisticsLine text="all" value={good + neutral + bad}/><br /></tr>
                    <tr><StatisticsLine text="average" value={(good + badPoints) / 2}/><br /></tr>
                    <tr><StatisticsLine text="positive" value={(good / (good + neutral + bad)) * 100}/>%<br /></tr>
                </table>
              </p>
            </>
        )
    }
}

export default Statistics