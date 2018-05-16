import React from 'react'
import { Route, Switch } from 'react-router'

// Import modules/routes
import Home from './home'
import About from './about'
import Quotes from './quotes'
import PageNotFound from './common/components/PageNotFound'

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/quotes' component={Quotes} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)
