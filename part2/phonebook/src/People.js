import Person from './Person'

const People = ({personsToShow}) => {
    return (
        personsToShow.map(person => (<Person name={person.name} 
                                             number={person.number} 
                                             id={person.id} 
                                             key={person.id} />
                                    )
                         )
           )
}

export default People