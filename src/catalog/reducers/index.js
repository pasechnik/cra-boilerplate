import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import categories from './categories'
import products from './products'
// import applications from './getData'
// import addItem from './addItem'
// import deleteItem from './deleteItem'
import notifications from './notifications'
// import item from './getItem'
// import editItem from './editItem'

const crud = combineReducers({
  notifications,
  products,
  categories
  // applications,
  // addItem,
  // deleteItem,
  // item,
  // editItem
})

export default crud
