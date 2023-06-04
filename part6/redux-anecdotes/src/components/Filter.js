import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filterTerm = useSelector(state => state.filter)
  const handleFilter = (event) => {
    dispatch(filter(event.target.value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleFilter} value={filterTerm}/>
    </div>
  )
}

export default Filter
