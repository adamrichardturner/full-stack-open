const Votes = ({anecdotes, points}) => {
    // Store in max our maximum value of points
    const max = Math.max(...points)
    return (
        <>
            <h2>Anecdote with most votes</h2>
                {anecdotes[points.indexOf(max)]}<br/>
            <p>has {max} votes</p>
        </>
    )
}

export default Votes