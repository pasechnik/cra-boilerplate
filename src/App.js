import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
// import ReactGA from 'react-ga'

import 'rxjs'
import 'bootstrap/dist/css/bootstrap.css'

import store, { history } from './store'

// Styles
import './App.css'

// routes
// import routes from './routes'
// Async routes
import routes from './asyncRoutes'

// common components
import Header from './common/components/Header'

// import Footer from './common/components/Footer'

function App() {
  // ReactGA.initialize()

  return (
    <Provider store={store}>
      {/* <Router history={history} basename='/deposit_mobile/'> */}
      <Router history={history}>
        <div className="App">
          <Header />
          <div className="wrap">{routes}</div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
