import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import ListContainer from './containers/ListContainer'
import ViewContainer from './containers/ViewContainer'
import Notification from './components/Notification'
import fClearNotification from './actions/clearNotification'
import { notification } from './models'
import './style.css'
import {
  makeCategoriesRequest as fMakeCategoriesRequest,
  makeProductsRequest as fMakeProductsRequest
} from './actions/makeDataRequest'

class Catalog extends Component {
  componentDidMount() {
    const { makeCategoriesRequest, makeProductsRequest } = this.props
    makeCategoriesRequest()
    makeProductsRequest()
  }

  render() {
    const {
      match: { path },
      notifications,
      clearNotification
    } = this.props

    return (
      <div id="catalog">
        <Switch>
          <Redirect exact from={`${path}`} to={`${path}/list`} />
          <Route path={`${path}/list`} component={ListContainer} />
          <Route path={`${path}/:id`} component={ViewContainer} />
        </Switch>
        <Notification
          notifications={notifications}
          clearNotification={clearNotification}
        />
      </div>
    )
  }
}

Catalog.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string
  }).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape(notification.propTypes))
    .isRequired,
  makeProductsRequest: PropTypes.func.isRequired,
  makeCategoriesRequest: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  // products: state.catalog.products.data,
  // categories: state.catalog.categories.data,
  // propsCategory: state.catalog.propsCategory.data,
  notifications: state.catalog.notifications.messages
})

const mapDispatchToProps = {
  clearNotification: fClearNotification,
  makeCategoriesRequest: fMakeCategoriesRequest,
  makeProductsRequest: fMakeProductsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
