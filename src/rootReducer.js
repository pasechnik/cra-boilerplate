import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import your Module reducers here and combine them
import home from './home/reducers'
import tradefx from './tradefx/reducers'
import github from './github/reducers'
import quotes from './quotes/reducers'
import crud from './crud/reducers'
import upland from './upland/reducers'
import deposit from './deposit_mobile/reducers'

const rootReducer = combineReducers({
  router: routerReducer,
  tradefx,
  deposit,
  home,
  github,
  quotes,
  crud,
  upland,
})

export default rootReducer
