import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// Helper Functions
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

// Anecdote Slice
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const obj = asObject(content)
    const newAnecdote = await anecdoteService.createNew(obj)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
