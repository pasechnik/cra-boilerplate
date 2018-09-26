import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import data from './data'
import deposit from './deposit'
import initial from './initial'
import common from '../modules/common/reducers'

const depositMobile = combineReducers({
  common,
  initial,
  data,
  deposit,
})

export default depositMobile
