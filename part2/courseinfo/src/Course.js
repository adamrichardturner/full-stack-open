import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
    const { name, parts } = course;
    const exercises = parts.map(part => part.exercises)
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