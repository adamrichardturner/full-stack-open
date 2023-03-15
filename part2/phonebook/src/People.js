import Person from './Person'

const People = ({personsToShow, handleDelete}) => {
    return (
        personsToShow.map(person => <Person name={person.name} 
                                            number={person.number} 
                                            key={person.id + 1}
                                            id={person.id}
                                            handleDelete={handleDelete}
                                            />
                                            )
           )
}

export default People