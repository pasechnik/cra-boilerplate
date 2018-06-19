import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import applications from './getData'

const crud = combineReducers({
  applications
})

export default crud
