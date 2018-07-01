import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import your Module reducers here and combine them
import home from './home/reducers'
import quotes from './quotes/reducers'
import crud from './crud/reducers'

// const initialReducers = {
// home: (state = HomeInitialState) => state,
// }

const rootReducer = combineReducers({
  router: routerReducer,
  home,
  quotes,
  crud,
  // ...initialReducers,
})

export default rootReducer
