import { combineReducers } from 'redux'

// import your Home Module reducers here and combine them
// Placed in same directory
import repos from './repos'
import users from './users'

const github = combineReducers({
  users,
  repos,
})

export default github
