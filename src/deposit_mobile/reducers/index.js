import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import data from './getData'
import makeDeposit from './makeDeposit'

const deposit = combineReducers({
  data,
  makeDeposit
})

export default deposit
