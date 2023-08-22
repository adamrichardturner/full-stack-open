const Person = ({name, number, id, handleDelete}) => {
    const handleClick = () => {
        handleDelete(id)
    }
    return (
        <>
            <p key={name}>{name} {number}</p>
            <button onClick={handleClick}>delete</button>
        </>
        )
}

export default Person