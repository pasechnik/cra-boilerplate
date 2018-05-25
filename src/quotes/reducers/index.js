import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import newQuotes from './applyQuotes'
import operation from './applyOperation'

const quotes = combineReducers({
  newQuotes,
  operation,
})

export default quotes
