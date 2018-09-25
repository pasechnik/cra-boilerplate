import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch, Link } from 'react-router-dom'
import {
  Container, Row, Col, Button,
} from 'reactstrap'
import QuotesList from './containers/QuotesList'
import Order from './containers/Order'
import PhoneVerification from './containers/PhoneVerification'
import CodeVerification from './containers/CodeVerification'
import { receiveQuotesArrStart as fReceiveQuotesArrStart } from './actions/receiveQuotes'
import './style.css'

class Quotes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
    }
  }

  componentDidMount() {
    const { symbols, receiveQuotesArrStart } = this.props
    receiveQuotesArrStart(symbols)
  }


  toggle = () => {
    const { modal } = this.state
    this.setState({ modal: !modal })
  }


  render() {
    const { modal } = this.state
    const { match: { path } } = this.props
    ReactGA.pageview(window.location.pathname + window.location.search)
    // ReactGA.pageview('/quotes')
    return (
      <div id='quotes'>
        <Container>
          <Row>
            <Col>
              <h2 className='text-center'>
                Quotes
              </h2>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 6 }}>
              <Link to='/quotes/list' href='/quotes/list'>
                <Button
                  className='2'
                  onClick={this.handleClick}
                >
                  Start Trading
                </Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch>
                <Route
                  exact
                  path={`${path}/list`}
                  render={() => (
                    <QuotesList
                      modal={modal}
                      toggle={this.toggle}
                    />
                  )}
                />
                <Route path={`${path}/list/:symbol/:type?`} component={Order} />
                <Route path={`${path}/phone-verification`} component={PhoneVerification} />
                <Route path={`${path}/code-verification`} component={CodeVerification} />
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
  receiveQuotesArrStart: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
}

const mapStateToProps = state => ({
  symbols: state.quotes.newQuotes.symbols,
})

const mapDispatchToProps = {
  receiveQuotesArrStart: fReceiveQuotesArrStart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes)
