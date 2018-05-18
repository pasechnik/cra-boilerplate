import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import newQuotes from './applyQuotes'

const quotes = combineReducers({
  newQuotes,
})

export default quotes
