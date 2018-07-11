import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import your Module reducers here and combine them
import deposit from './deposit_mobile/reducers'

const rootReducer = combineReducers({
  router: routerReducer,
  deposit,
  // ...initialReducers,
})

export default rootReducer
