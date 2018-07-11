import React from 'react'
import { Route, Switch } from 'react-router'

// Import modules/routes
import Deposit from './deposit_mobile'
import PageNotFound from './common/components/PageNotFound'

export default (
  <Switch>
    <Route exact path='/' component={Deposit} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)
