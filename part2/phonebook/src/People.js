import Person from './Person'

const People = ({personsToShow}) => {
    return (
        personsToShow.map(person => <Person name={person.name} 
                                            number={person.number} 
                                            key={person.id + 1}
                                            />
                                            )
           )
}

export default People