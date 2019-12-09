import { combineReducers } from 'redux'

// import your Home Module reducers here and combine them
// Placed in same directory
import users from './users'

const github = combineReducers({
  users
})

export default github
