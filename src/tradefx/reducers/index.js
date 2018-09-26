import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import quotes from './quotes'

const tradefx = combineReducers({ quotes })

export default tradefx
