import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import data from './getData'

const upland = combineReducers({
  data
})

export default upland
