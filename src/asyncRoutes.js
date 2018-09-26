import React from 'react'
import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable'
import AppLoader from './common/components/AppLoader'

// Import modules/routes
import PageNotFound from './common/components/PageNotFound'

// Code splitting with dynamic import
// https://reactjs.org/docs/code-splitting.html
const Home = Loadable({
  loader: () => import('./home'),
  loading: AppLoader,
})

const About = Loadable({
  loader: () => import('./about'),
  loading: AppLoader,
})

const Quotes = Loadable({
  loader: () => import('./quotes'),
  loading: AppLoader,
})

const Crud = Loadable({
  loader: () => import('./crud'),
  loading: AppLoader,
})

const Deposit = Loadable({
  loader: () => import('./deposit_mobile'),
  loading: AppLoader,
})

const TradeFX = Loadable({
  loader: () => import('./tradefx'),
  loading: AppLoader,
})

const Github = Loadable({
  loader: () => import('./github'),
  loading: AppLoader,
})

const Upland = Loadable({
  loader: () => import('./upland'),
  loading: AppLoader,
})


export default (
  <Switch>
    <Route exact path='/' component={About} />
    <Route path='/home' component={Home} />
    <Route path='/tradefx' component={TradeFX} />
    <Route path='/github' component={Github} />
    <Route path='/about' component={Home} />
    <Route path='/crud' component={Crud} />
    <Route path='/quotes' component={Quotes} />
    <Route path='/deposit' component={Deposit} />
    <Route path='/upland' component={Upland} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)
