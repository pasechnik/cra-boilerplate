import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import QuotesList from './containers/QuotesList'
import Order from './containers/Order'
import PhoneVerification from './containers/PhoneVerification'
import CodeVerification from './containers/CodeVerification'
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
    return (
      <div id='quotes'>
        <Container>
          <Row>
            <Col>
              <h2 className='text-center'>Quotes</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/quotes/list' href='/quotes/list'><Button>Start Trading</Button></Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch>
                <Route
                  exact
                  path={`${this.props.match.path}/list`}
                  render={() => (<QuotesList
                    modal={this.state.modal}
                    toggle={this.toggle}
                  />)}
                />
                <Route path={`${this.props.match.path}/list/:SYMBOL/:type?`} component={Order} />
                <Route path={`${this.props.match.path}/phone-verification`} component={PhoneVerification} />
                <Route path={`${this.props.match.path}/code-verification`} component={CodeVerification} />
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

export default Quotes
