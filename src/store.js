import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import queryString from 'query-string'

// import root epics/reducer
import rootEpic from './rootEpic'
import { rootReducer, initial } from './rootReducer'

// export `history` to use in index.js, we using `createBrowserHistory`
export const history = createHistory()

const epicMiddleware = createEpicMiddleware(
  rootEpic,
  {
    dependencies: {
      queryString,
    },
  }
)

// Build the middleware for intercepting and dispatching navigation actions
const appRouterMiddleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //eslint-disable-line

const store = createStore(
  rootReducer,
  initial,
  composeEnhancers(
    applyMiddleware(epicMiddleware),
    applyMiddleware(appRouterMiddleware)
  )
)

export default store
