import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import classname from 'classname'
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
      <Row>
        <Col xs='2' className='align-middle trader-pair_symbol d-flex align-items-center'>
          <strong>{this.props.SYMBOL}</strong>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': this.props.DIRECTION > 0,
                'trader-down': this.props.DIRECTION < 0,
                'trader-zero': this.props.DIRECTION === 0,
              }
            )}
          >
            <Link to={`/quotes/list/${this.props.SYMBOL}`} href={`/quotes/list/${this.props.SYMBOL}`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleBuy}
              >
                Buy<br />
                <strong>{this.props.ASK}</strong>
              </Button>
            </Link>
          </div>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': this.props.DIRECTION > 0,
                'trader-down': this.props.DIRECTION < 0,
                'trader-zero': this.props.DIRECTION === 0,
              }
            )}
          >
            <Link to={`/quotes/list/${this.props.SYMBOL}`} href={`/quotes/list/${this.props.SYMBOL}`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleSell}
              >
                Sell<br />
                <strong>{this.props.BID}</strong>
              </Button>
            </Link>
          </div>
        </Col>
        <Col
          xs='2'
          className='align-middle text-center  trader-pair_symbol d-flex align-items-center justify-content-center'
        >
          {this.props.DIRECTION === 0 ? '' :
          <i
            className={classname(
                ['fa'],
                {
                  'fa-caret-up': this.props.DIRECTION > 0,
                  'fa-caret-down': this.props.DIRECTION < 0,
                }
              )}
          />
          }
          <strong
            className={classname(
              ['pl-1'],
              {
                'trader-up': this.props.DIRECTION > 0,
                'trader-down': this.props.DIRECTION < 0,
                'trader-zero': this.props.DIRECTION === 0,
              }
            )}
          >
            {this.props.DIRECTION}&#37;
          </strong>
        </Col>
      </Row>
    )
  }
}

Quote.propTypes = {
  chooseSellOperation: PropTypes.func.isRequired,
  chooseBuyOperation: PropTypes.func.isRequired,
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
