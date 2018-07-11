import React from 'react'
import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable'
import AppLoader from './common/components/AppLoader'

// Import modules/routes
import PageNotFound from './common/components/PageNotFound'

// Code splitting with dynamic import
// https://reactjs.org/docs/code-splitting.html

const Deposit = Loadable({
  loader: () => import('./deposit_mobile'),
  loading: AppLoader,
})

export default (
  <Switch>
    <Route exact path='/' component={Deposit} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)
