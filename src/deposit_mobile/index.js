import React from 'react'
import { Route, Switch } from 'react-router'

import MobileWrapper from './containers/MobileWrapper'
import SuccessDeposit from './containers/SuccessDeposit'
import ErrorDeposit from './containers/ErrorDeposit'
import PageNotFound from '../common/components/PageNotFound'

const Deposit = () => (
  <Switch>
    <Route exact path='/' component={MobileWrapper} />
    <Route path='/success' component={SuccessDeposit} />
    <Route path='/error' component={ErrorDeposit} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)

export default Deposit
