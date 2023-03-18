const Notification = ({ message }) => {
    const positiveStyle = {
        color: 'green',
        fontWeight: 600,
        fontSize: 16,
        border: '3px solid green',
        padding: 15,
        background: 'lightgrey' 
    }
    const negativeStyle = {
        color: 'red',
        fontWeight: 600,
        fontSize: 16,
        border: '3px solid red',
        padding: 15,
        background: 'lightgrey'  
    }
    if (message === null) {
        return null
    }

    const {type, notification} = message

    let notificationStyle

    if(type === 'positive') {
        notificationStyle = positiveStyle
    } else if (type === 'negative') {
        notificationStyle = negativeStyle
    }

    return (
        <div style={notificationStyle}>
            {notification}
        </div>
    )
}

export default Notification