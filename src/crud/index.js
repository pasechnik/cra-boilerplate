import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import { makeDataRequest } from './actions/makeDataRequest'
import SideNav from './components/SideNav'
import ListContainer from './containers/ListContainer'
import AddNewContainer from './containers/AddNewContainer'
import EditContainer from './containers/EditContainer'
import './style.css'

class Quotes extends Component {
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
            <Col md={{ size: 4 }}>
              <SideNav />
            </Col>
            <Col md={{ size: 8 }}>
              <Switch>
                <Route path={`${this.props.match.path}/list`} component={ListContainer} />
                <Route path={`${this.props.match.path}/add-new`} component={AddNewContainer} />
                <Route path={`${this.props.match.path}/edit`} component={EditContainer} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Quotes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({
  data: state.crud.applications.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Quotes)
