import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import { bindActionCreators } from 'redux'
import { Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import InputRange from 'react-input-range'
import { obj } from 'the-utils'
import HocModal from '../HOC/HocModal'
import { makeOrderFulfilled } from '../actions/makeOrder'
import { goTo } from '../../common/actions/goTo'

class Order extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: {
        min: 30,
        max: 50,
      },
    }
  }

  componentDidMount() {
    this.gaView()
  }

  gaView = () => {
    ReactGA.event({
      category: 'Asset',
      action: 'Views',
      label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
    })
  }

  gaCLose = () => {
    ReactGA.event({
      category: 'Asset',
      action: 'Close',
      label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
    })
  }

  gaConfirm = () => {
    ReactGA.event({
      category: 'Asset',
      action: 'Confirm ',
      label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
    })
  }

  gaBack = () => {
    ReactGA.event({
      category: 'Asset',
      action: 'Back',
      label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
    })
  }

  handleOperation = (type) => {
    const buy = this.props.match.params.type !== undefined && this.props.match.params.type === type
    if (buy !== true) this.props.goTo(`/quotes/list/${this.props.match.params.symbol}/${type}`)
  }

  handleChange = ({ min, max }) => {
    let mmin = 0
    let mmax = 50
    if (min > 0) {
      mmin = min > 30 ? 30 : min
    }
    if (max > 50) {
      mmax = max > 60 ? 60 : max
    }
    this.setState({
      value: {
        min: mmin,
        max: mmax,
      },
    })
  }

  calculatePrice = (x, d, r = 4) => Math.round(x * (0.9996 + (d * 0.00001)) * (10 ** r)) / (10 ** r)

  render() {
    const pair = obj.get(this.props.quotes, this.props.match.params.symbol, undefined)
    if (pair === undefined) {
      return (
        <div>Loading...</div>
      )
    }
    const price = pair[this.props.buy ? 'bid' : 'ask']
    // const digitsString = price !== undefined ? String(price).split('.')[1] : ''
    const { digits } = pair// digitsString.length
    const priceMin = this.calculatePrice(price, this.state.value.min, digits)
    const priceMax = this.calculatePrice(price, this.state.value.max, digits)
    const buy = !!(this.props.match.params.type === undefined || this.props.match.params.type === 'buy')

    return (
      <div className='quote-order_container'>
        <div className='d-flex justify-content-between'>
          <Link to='/quotes/list' href='/quotes/list' className='quote_back-btn' onClick={this.gaBack}>
            {/* <i className='fa fa-chevron-left' /> */}
            <span className='quote-modal_chevron'>&#8249;</span>
          </Link>
          <h3 className='font-weight-bold text-center'>
            New Order{' '}
            <span className='text-primary'>{pair.symbol}</span>
          </h3>
          <Link to='/quotes' href='/quotes' className='quote_close-btn' onClick={this.gaCLose}>✕</Link>
        </div>
        <hr className='mb-5' />
        <Row>
          <Col xs='6'>
            <Button
              block
              className={!buy ? 'active-sell' : 'no-active'}
              onClick={() => this.handleOperation('sell')}
            >
              <strong>Sell<br /></strong>
              <span>{pair.bid}</span>
            </Button>
          </Col>
          <Col xs='6'>
            <Button
              block
              className={buy ? 'active-buy' : 'no-active'}
              onClick={() => this.handleOperation('buy')}
            >
              <strong> Buy</strong><br />
              <span>{pair.ask}</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <form className='form'>
              <InputRange
                draggableTrack
                maxValue={63}
                minValue={-2}
                onChange={this.handleChange}
                // onChangeComplete={value => console.log(value)}
                value={this.state.value}
              />
            </form>
            <Row>
              <Col xs='6'>
                <div>
                  <strong>{!buy ? 'Take profit' : 'Stop Lost'}</strong>
                  <br />
                  {priceMin}
                </div>
              </Col>
              <Col xs='6'>
                <div className='text-right'>
                  <strong>{!buy ? 'Stop Lost' : 'Take profit'}</strong>
                  <br />
                  {priceMax}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            md={{
              size: 6,
              offset: 3,
            }}
            xs={{
              size: 8,
              offset: 2,
            }}
          >
            <div className='my-4'>
              <Link to='/quotes/phone-verification' href='/quotes/phone-verification'>
                <Button
                  className='confirm-btn'
                  size='lg'
                  block
                  onClick={() => {
                    const data = {
                      pair,
                      priceMin,
                      priceMax,
                      operation: buy ? 'buy' : 'sell',
                      symbol: pair.symbol,
                    }
                    this.gaConfirm()
                    this.props.makeOrderFulfilled(data)
                  }}
                >
                  Confirm
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

Order.defaultProps = {
  buy: true,
}

Order.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      symbol: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  goTo: PropTypes.func.isRequired,
  makeOrderFulfilled: PropTypes.func.isRequired,
  buy: PropTypes.bool,
  quotes: PropTypes.shape({
    symbol: PropTypes.string,
    timestamp: PropTypes.number,
    bid: PropTypes.number,
    ask: PropTypes.number,
    direction: PropTypes.number,
    digits: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  quotes: state.quotes.newQuotes.quotes0,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeOrderFulfilled,
  goTo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(Order))
