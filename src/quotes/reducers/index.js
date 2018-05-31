import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import newQuotes from './applyQuotes'
import order from './applyOrder'

const quotes = combineReducers({
  newQuotes,
  order,
})

export default quotes
