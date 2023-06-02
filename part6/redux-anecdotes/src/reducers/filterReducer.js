// Action Creators
export const newFilter = (term) => ({ type: 'SET_FILTER', data: term })

const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export default filterReducer