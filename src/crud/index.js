import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import SideNav from './components/SideNav'
import ListContainer from './containers/ListContainer'
import AddNewContainer from './containers/AddNewContainer'
import EditContainer from './containers/EditContainer'
import Notification from './components/Notification'
import { clearNotification } from './actions/clearNotification'
import './style.css'

class Crud extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }


  render() {
    ReactGA.pageview(window.location.pathname + window.location.search)
    // ReactGA.pageview('/quotes')
    return (
      <div id='crud'>
        <Container>
          <Row>
            <Col>
              <h2 className='text-center'>Crud</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 3 }}>
              <SideNav />
            </Col>
            <Col md={{ size: 9 }}>
              <Switch>
                <Route path={`${this.props.match.path}/list`} component={ListContainer} />
                <Route path={`${this.props.match.path}/add-new`} component={AddNewContainer} />
                <Route path={`${this.props.match.path}/edit/:id`} component={EditContainer} />
              </Switch>
            </Col>
          </Row>
        </Container>
        <Notification
          notifications={this.props.notifications}
          clearNotification={this.props.clearNotification}
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

const mapDispatchToProps = dispatch => bindActionCreators({
  clearNotification,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Crud)
