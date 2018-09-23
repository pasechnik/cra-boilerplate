import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import 'rxjs'
import 'bootstrap/dist/css/bootstrap.css'

import store, { history } from './store'

// Styles
import './App.css'

// routes
import routes from './routes'
// Async routes
// import routes from './asyncRoutes'

// common components

const App = () => (
  <Provider store={store}>
    {/* <Router history={history}> */}
    <Router history={history} basename='/deposit_mobile/'>
      <div className='App'>
        <div className='wrap'>
          {routes}
        </div>
      </div>
    </Router>
  </Provider>
)

export default App
