import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import your Module reducers here and combine them
import home from './home/reducers'
import tradefx from './tradefx/reducers'
import github from './github/reducers'
import crud from './crud/reducers'
import catalog from './catalog/reducers'
import upland from './upland/reducers'

const rootReducer = combineReducers({
  router: routerReducer,
  tradefx,
  home,
  github,
  catalog,
  crud,
  upland
})

export default rootReducer
