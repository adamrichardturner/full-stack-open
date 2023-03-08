const Button = ({name, handleButtonState}) => {
    return (
        <button name={name} 
                onClick={handleButtonState}>
                {name}
        </button>
    )
  }
  
  export default Button