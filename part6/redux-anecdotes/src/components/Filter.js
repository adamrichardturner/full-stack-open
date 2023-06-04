import { useSelector, useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filterTerm = useSelector(state => state.filter)
  const handleChange = (event) => {
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
