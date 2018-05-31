import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import InputRange from 'react-input-range'
import { obj } from 'the-utils'
import HocModal from '../HOC/HocModal'
// import mockQuote from '../../mockData'
import { makeOrderFulfilled } from '../actions/makeOrder'
import { goTo } from '../../common/actions/goTo'

class Order extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // pair: [],
      value: {
        min: 0,
        max: 50,
      },
    }
  }

  // componentDidMount() {
  //   const pair = obj.get(this.props.quotes, this.props.match.params.symbol, undefined)
  //   console.log(this.props.quotes)
  //   if (pair !== undefined) {
  //     setTimeout(() => {
  //       this.setState({ pair })
  //     }, 0)
  //   }
  // }

  handleOperation = (type) => {
    const buy = !!(this.props.match.params.type !== undefined && this.props.match.params.type === type)
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
    this.setState({ value: { min: mmin, max: mmax } })
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
      <div className='quote-order_container' >
        <div className='d-flex justify-content-between'>
          <Link to='/quotes/list' href='/quotes/list' className='quote_back-btn'>
            <i className='fa fa-chevron-left' />
          </Link>
          <h3 className='font-weight-bold text-center'>New Order{' '}
            <span className='text-primary'>{pair.symbol}</span>
          </h3>
          <Link to='/quotes' href='/quotes' className='quote_close-btn'><i className='fa fa-times' /></Link>
        </div >
        <hr className='mb-5' />
        <Row>
          <Col xs='6'>
            <Button
              block
              className={buy ? 'active-buy' : 'no-active'}
              onClick={() => this.handleOperation('buy')}
            >
              Buy<br />
              <strong>{pair.ask}</strong>
            </Button>
          </Col>
          <Col xs='6'>
            <Button
              block
              className={!buy ? 'active-sell' : 'no-active'}
              onClick={() => this.handleOperation('sell')}
            >
              Sell<br />
              <strong>{pair.bid}</strong>
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
                  {!buy ? 'Take profit' : 'Stop Lost'}
                  <br />
                  {priceMin}
                </div>
              </Col>
              <Col xs='6'>
                <div className='text-right'>
                  {!buy ? 'Stop Lost' : 'Take profit'}
                  <br />
                  {priceMax}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
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
