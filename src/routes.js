import React from 'react'
import { Route, Switch } from 'react-router'

// Import modules/routes
import Deposit from './deposit_mobile'
import MobileWrapper from './deposit_mobile/containers/MobileWrapper'
import SuccessDeposit from './deposit_mobile/containers/SuccessDeposit'
import PageNotFound from './common/components/PageNotFound'

export default (
  <Switch>
    <Deposit>
      <Route exact path='/' component={MobileWrapper} />
      <Route path='/success' component={SuccessDeposit} />
    </Deposit>
    <Route path='*' component={PageNotFound} />
  </Switch>
)
