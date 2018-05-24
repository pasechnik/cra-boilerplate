import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import {
  chooseSellOperation,
  chooseBuyOperation,
} from '../actions/chooseOperation'


class Quote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pair: [],
    }
  }

  handleSell = () => {
    this.props.chooseSellOperation()
  }

  handleBuy = () => {
    this.props.chooseBuyOperation()
  }

  render() {

    return (
      <tr className={this.props.className}>
        <td className='align-middle'>{this.props.SYMBOL}</td>
        <td>
          <Link to={`/quotes/list/${this.props.SYMBOL}`}>
            <Button block className='px-md-4' onClick={this.handleSell}>Sell<br />{this.props.BID}</Button>
          </Link>
        </td>
        <td>
          <Link to={`/quotes/list/${this.props.SYMBOL}`}>
            <Button block className='px-md-4' onClick={this.handleBuy}>Buy<br />{this.props.ASK}</Button>
          </Link>
        </td>
        <td className='align-middle text-center'>
          <span className='triangle'></span>
          &#8722;{this.props.DIRECTION}&#37;
          </td>
      </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(Quote)
