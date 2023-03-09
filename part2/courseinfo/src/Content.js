import Part from "./Part"

const Content = ({ parts }) => {
    // In allParts we store a new array containing Part components where we have
    // iterated over each object in the parts array, assigning the relevant values
    // within, to the values paired to props on the Part component
    const allParts = parts.map(part => {
        return <Part key={part.id} name={part.name} exercises={part.exercises}/>
    }
  )
  return allParts
}

export default Content