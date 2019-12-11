import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import categories from './categories'
import category from './category'
import products from './products'
import notifications from './notifications'

const crud = combineReducers({
  notifications,
  products,
  categories,
  category
})

export default crud
