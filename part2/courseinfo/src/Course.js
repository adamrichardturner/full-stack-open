import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
    // Destructure course into name and parts variables
    const { name, parts } = course;
    // Store in exercises an array of the exercises for each part
    const exercises = parts.map(part => part.exercises)
    // Store in total the total of all exercises
    const total = exercises.reduce((a, b) => a + b)
    return(
        <>
            <Header name={name}/>
            <Content parts={parts}/>
            <p style={{fontWeight: 800}}>total of {total} exercises</p>
        </>
    )
}

export default Course