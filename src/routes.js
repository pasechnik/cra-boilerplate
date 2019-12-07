import React from 'react'
import { Route, Switch } from 'react-router'

// import Deposit from './deposit_mobile'
import MobileWrapper from './deposit_mobile/containers/MobileWrapper'
import SuccessDeposit from './deposit_mobile/containers/SuccessDeposit'
import ErrorDeposit from './deposit_mobile/containers/ErrorDeposit'
import PageNotFound from './common/components/PageNotFound'

export default (
  <Switch>
    <Route exact path="/" component={MobileWrapper} />
    <Route path="/success" component={SuccessDeposit} />
    <Route path="/error" component={ErrorDeposit} />
    <Route path="*" component={PageNotFound} />
  </Switch>
)
