import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import get from 'lodash/get'
import { Redirect } from 'react-router'
import SideNav from './components/SideNav'
import ListContainer from './containers/ListContainer'
import AddNewContainer from './containers/AddNewContainer'
import EditContainer from './containers/EditContainer'
import Notification from './components/Notification'
import fClearNotification from './actions/clearNotification'
import { notification } from './models'
import './style.css'
import { category } from './models/category'

class Catalog extends Component {
  toggle = () => {
    const { modal } = this.state
    this.setState({ modal: !modal })
  }

  render() {
    const {
      match: { path },
      notifications,
      clearNotification,
      categories
    } = this.props
    ReactGA.pageview(window.location.pathname + window.location.search)

    return (
      <div id="catalog">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">Catalog</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 3 }}>
              <SideNav categories={categories} />
            </Col>
            <Col md={{ size: 9 }}>
              <Switch>
                <Redirect exact from={`${path}`} to={`${path}/list`} />
                <Route path={`${path}/list`} component={ListContainer} />
                <Route path={`${path}/add-new`} component={AddNewContainer} />
                <Route path={`${path}/edit/:id`} component={EditContainer} />
              </Switch>
            </Col>
          </Row>
        </Container>
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
  categories: PropTypes.arrayOf(PropTypes.shape(category.propTypes)).isRequired,
  clearNotification: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: state.catalog.products.data,
  categories: state.catalog.categories.data,
  notifications: state.catalog.notifications.messages
})

const mapDispatchToProps = {
  clearNotification: fClearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
