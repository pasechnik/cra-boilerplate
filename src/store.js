import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { WebSocketSubject } from 'rxjs/webSocket'
import createHistory from 'history/createBrowserHistory'
// import createHistory from 'history/createHashHistory'
import { routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'

// import root epics/reducer
import rootEpic from './rootEpic'
import rootReducer from './rootReducer'

// export `history` to use in index.js, we using `createBrowserHistory`
export const history = createHistory()

const socket = new WebSocketSubject('wss://feed.devopdata.co/ws2/all')
// const socket = new WebSocketSubject('ws://35.195.28.154:44300/all')
// const socket = new WebSocketSubject('ws://35.195.28.154:44301/quotes/all')
// new endpoint
// const socket = new WebSocketSubject('ws://35.195.28.154:44301/quotes/custom')

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    getJSON: ajax.getJSON,
    post: ajax.post,
    multiplex: socket.multiplex.bind(socket),
  },
})

// Build the middleware for intercepting and dispatching navigation actions
const appRouterMiddleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line
const preload = window.__PRELOAD_STATE__ // eslint-disable-line no-underscore-dangle

const store = createStore(
  rootReducer,
  preload,
  composeEnhancers(
    applyMiddleware(ReduxThunk),
    applyMiddleware(epicMiddleware),
    applyMiddleware(appRouterMiddleware),
  ),
)

epicMiddleware.run(rootEpic)

export default store
