import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import SideNav from './components/SideNav'
import ListContainer from './containers/ListContainer'
import AddNewContainer from './containers/AddNewContainer'
import EditContainer from './containers/EditContainer'
import Notification from './components/Notification'
import fClearNotification from './actions/clearNotification'
import { notification } from './models'
import './style.css'

class Crud extends Component {
  static propTypes = {
    notifications: PropTypes.shape(notification.propTypes).isRequired,
    clearNotification: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      modal: false,
    }
  }

  toggle = () => {
    const { modal } = this.state
    this.setState({ modal: !modal })
  }


  render() {
    const { match: { path }, notifications, clearNotification } = this.props
    ReactGA.pageview(window.location.pathname + window.location.search)
    // ReactGA.pageview('/quotes')
    return (
      <div id='crud'>
        <Container>
          <Row>
            <Col>
              <h2 className='text-center'>
                Crud
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 3 }}>
              <SideNav />
            </Col>
            <Col md={{ size: 9 }}>
              <Switch>
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

Crud.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({
  data: state.crud.applications.data,
  notifications: state.crud.notifications.messages,
})

const mapDispatchToProps = {
  clearNotification: fClearNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Crud)
