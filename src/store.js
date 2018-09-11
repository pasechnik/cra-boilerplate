import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import createHistory from 'history/createBrowserHistory'
// import createHistory from 'history/createHashHistory'
import { routerMiddleware } from 'react-router-redux'
// import queryString from 'query-string'
import ReduxThunk from 'redux-thunk'

// import root epics/reducer
import rootEpic from './rootEpic'
import rootReducer from './rootReducer'

// export `history` to use in index.js, we using `createBrowserHistory`
// export const history = createHistory({ basename: '/cra-boilerplate' })
// export const history = createHistory({ basename: '/deposit_mobile/' })
export const history = createHistory()

const epicMiddleware = createEpicMiddleware()

// const epicMiddleware = createEpicMiddleware(
//   rootEpic,
//   {
//     dependencies: {
//       queryString,
//     },
//   },
// )

// Build the middleware for intercepting and dispatching navigation actions
const appRouterMiddleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line
const preload = window.__PRELOAD_STATE__ // eslint-disable-line no-underscore-dangle

console.log({ preload })

const store = createStore(
  rootReducer,
  preload,
  composeEnhancers(
    applyMiddleware(ReduxThunk),
    applyMiddleware(epicMiddleware),
    applyMiddleware(appRouterMiddleware),
  ),
)

console.log({ state: store.getState() })

epicMiddleware.run(rootEpic)

export default store
