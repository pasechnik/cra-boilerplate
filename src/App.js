import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import 'rxjs'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import store, { history } from './store'

// Styles
import './App.css'

// routes
// import routes from './routes'
// Async routes
import routes from './asyncRoutes'

// common components

function App() {
  return (
    <Provider store={store}>
      {/* <Router history={history} basename='/cra-boilerplate/'> */}
      <Router history={history}>
        <div className='App'>
          <div className='wrap'>
            {routes}
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
