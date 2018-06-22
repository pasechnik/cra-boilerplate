import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import applications from './getData'
import addItem from './addItem'
import deleteItem from './deleteItem'
import notifications from './notifications'
import item from './getItem'

const crud = combineReducers({
  applications,
  addItem,
  deleteItem,
  notifications,
  item,
})

export default crud
