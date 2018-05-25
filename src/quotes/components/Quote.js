import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import {
  chooseSellOperation,
  chooseBuyOperation,
} from '../actions/chooseOperation'


class Quote extends Component {
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
          <Link to={`/quotes/list/${this.props.SYMBOL}`} href={`/quotes/list/${this.props.SYMBOL}`}>
            <Button block className='px-md-4' onClick={this.handleSell}>Sell<br />{this.props.BID}</Button>
          </Link>
        </td>
        <td>
          <Link to={`/quotes/list/${this.props.SYMBOL}`} href={`/quotes/list/${this.props.SYMBOL}`}>
            <Button block className='px-md-4' onClick={this.handleBuy}>Buy<br />{this.props.ASK}</Button>
          </Link>
        </td>
        <td className='align-middle text-center'>
          <span className='triangle' />
          &#8722;{this.props.DIRECTION}&#37;
        </td>
      </tr>
    )
  }
}

Quote.propTypes = {
  chooseSellOperation: PropTypes.func.isRequired,
  chooseBuyOperation: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  SYMBOL: PropTypes.string.isRequired,
  BID: PropTypes.number.isRequired,
  ASK: PropTypes.number.isRequired,
  DIRECTION: PropTypes.number.isRequired,
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
