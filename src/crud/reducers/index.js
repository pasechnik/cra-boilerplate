import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import applications from './getData'
import addItem from './addItem'

const crud = combineReducers({
  applications,
  addItem,
})

export default crud
