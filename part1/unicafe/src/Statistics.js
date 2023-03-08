import StatisticsLine from "./StatisticsLine"

const Statistics = ({good, neutral, bad}) => {
    // Calculate average
    const average = (good - bad) / (good + bad + neutral)
    // Calculate positive percentage
    const positive = (good / (good + neutral + bad)) * 100
    // conditional render if no button has been pressed
    if(good === 0 && neutral === 0 && bad === 0) {
        return(<p>No feedback given</p>)
    } else {
        return (
            <>
                <table>
                    <tbody>
                        <tr><StatisticsLine text="good" value={good}/></tr>
                        <tr><StatisticsLine text="neutral" value={neutral}/></tr>
                        <tr><StatisticsLine text="bad" value={bad}/></tr>
                        <tr><StatisticsLine text="all" value={good + neutral + bad}/></tr>
                        <tr><StatisticsLine text="average" value={average || 0}/></tr>
                        <tr><StatisticsLine text="positive" value={positive + '%'}/></tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default Statistics