import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import data from './getData'
import deposit from './deposit'
import initial from './initial'
import common from './common'

const depositMobile = combineReducers({
  common,
  initial,
  data,
  deposit,
})

export default depositMobile
