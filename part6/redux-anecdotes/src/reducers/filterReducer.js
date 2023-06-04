import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  setFilter(state, action) {
    return state ? action.data : state
  }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer