import { useSelector, useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filterTerm = useSelector(state => state.filter)
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    console.log(event.target.value)
    dispatch(newFilter(event.target.value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filterTerm}/>
    </div>
  )
}

export default Filter
