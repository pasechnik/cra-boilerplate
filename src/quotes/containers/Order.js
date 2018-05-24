import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import InputRange from 'react-input-range'
import HocModal from '../HOC/HocModal'
import mockQuote from '../../mockData'
import {
  chooseSellOperation,
  chooseBuyOperation,
} from '../actions/chooseOperation'

class Order extends Component {
  constructor(props) {
    super(props)

    this.min = 0
    this.max = 0

    this.state = {
      pair: [],

      value: {
        min: 0,
        max: 50,
      }
    }
  }

  componentDidMount() {
    const pair = mockQuote.find(item => item.SYMBOL === this.props.match.params.SYMBOL)

    if (pair !== undefined) {
      this.setState({ pair })
    }
  }

  handleSell = () => {
    this.props.chooseSellOperation()
  }

  handleBuy = () => {
    this.props.chooseBuyOperation()
  }

  handleChange = ({ min, max }) => {
    const mmin = min < 0 ? 0 : (min > 30 ? 30 : min)
    const mmax = max < 50 ? 50 : (max > 60 ? 60 : max)
    this.setState({ value: { min: mmin, max: mmax } })
  }

  calculatePrice = (x, d, r = 4) => Math.round(x * (0.9996 + d * 0.00001) * (10 ** r)) / (10 ** r)

  render() {
    const price = this.state.pair[this.props.sell ? 'BID' : 'ASK']

    const digitsString = price !== undefined ? String(price).split('.')[1] : ''
    const digits = digitsString.length
    console.log(digits)
    const priceMin = this.calculatePrice(price, this.state.value.min, digits + 2)
    const priceMax = this.calculatePrice(price, this.state.value.max, digits + 2)

    return (
      <div className='quote-order_container' >
        <div className='d-flex justify-content-between'>
          <Link to='/quotes/list' className='quote_close-btn'>⇦</Link>
          <h3 className='font-weight-bold'>New Order <span className="text-primary">{this.state.pair.SYMBOL}</span></h3>
          <Link to='/quotes' className='quote_close-btn'>×</Link>
        </div >
        <hr className='mb-5' />
        <Row>
          <Col md='6'>
            <Button
              block
              className={this.props.buy ? 'active-buy' : 'no-active'}
              onClick={this.handleBuy}>
              Buy<br />{this.state.pair.ASK}
            </Button>
          </Col>
          <Col md='6'>
            <Button
              block
              className={this.props.sell ? 'active-sell' : 'no-active'}
              onClick={this.handleSell}>
              Sell<br />{this.state.pair.BID}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <form className="form">
              <InputRange
                draggableTrack
                maxValue={63}
                minValue={-2}
                onChange={this.handleChange}
                onChangeComplete={value => console.log(value)}
                value={this.state.value}
              />
            </form>
            <Row>
              <Col md='6'>
                <div>
                  {this.props.sell ? 'Take profit' : 'Stop Lost'}
                  <br />
                  {priceMin}
                </div>
              </Col>
              <Col md='6'>
                <div className='text-right'>
                  {this.props.sell ? 'Stop Lost' : 'Take profit'}
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
              <Link to='/quotes/verification'>
                <Button className='confirm-btn' size='lg' block>Confirm</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  sell: state.quotes.operation.sell,
  buy: state.quotes.operation.buy,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseSellOperation,
  chooseBuyOperation,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(Order))
