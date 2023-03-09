const Part = ({ id, name, exercises }) => {
        return (
            <p id={id}>{name} {exercises}</p>
        )
}

export default Part