import React from 'react'
// import ReactDOM from 'react-dom'
import { render } from 'react-snapshot'
import 'rxjs'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

// ReactDOM.render(
render(
  <App />,
  document.getElementById('root')
)
registerServiceWorker()
