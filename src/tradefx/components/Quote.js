import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import classname from 'classname'
import { Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'


class Quote extends Component {
  gaAssets = (a, value) => {
    ReactGA.event({
      category: 'TradeNow',
      action: a,
      label: `${value.symbol}/${value.type}`,
    })
  }

  handleBuy = () => {
    const { row, symbol } = this.props
    this.gaAssets(`Asset${row}`, {
      symbol,
      type: 'buy',
    })
  }

  handleSell = () => {
    const { row, symbol } = this.props
    this.gaAssets(`Asset${row}`, {
      symbol,
      type: 'sell',
    })
  }

  render() {
    const {
      label, direction, symbol, bid, ask,
    } = this.props
    return (
      <Row>
        <Col xs='2' className='align-middle trader-pair_symbol d-flex align-items-center'>
          <strong>
            {label}
          </strong>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': direction === 0,
                'trader-down': direction > 0,
                'trader-zero': direction < 0,
              }
            )}
          >
            <Link to={`/quotes/list/${symbol}/sell`} href={`/quotes/list/${symbol}/sell`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleSell}
              >
                <strong>
                  {' '}
                  Sell
                </strong>
                <br />
                <span>
                  {bid}
                </span>
              </Button>
            </Link>
          </div>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': direction === 0,
                'trader-down': direction > 0,
                'trader-zero': direction < 0,
              }
            )}
          >
            <Link to={`/quotes/list/${symbol}/buy`} href={`/quotes/list/${symbol}/buy`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleBuy}
              >
                <strong>
                  Buy
                </strong>
                <br />
                <span>
                  {ask}
                </span>
              </Button>
            </Link>
          </div>
        </Col>
        <Col
          xs='2'
          className='align-middle text-center  trader-pair_symbol d-flex align-items-center justify-content-center'
        >
          {direction < 0 ? '' : (
            <i
              className={classname(
                ['fa'],
                {
                  'fa-caret-up': direction === 0,
                  'fa-caret-down': direction > 0,
                }
              )}
            />
          )
          }
          <strong
            className={classname(
              ['pl-1'],
              {
                'trader-up': direction === 0,
                'trader-down': direction > 0,
                'trader-zero': direction < 0,
              }
            )}
          >
            {direction}
            &#37;
          </strong>
        </Col>
      </Row>
    )
  }
}

Quote.propTypes = {
  symbol: PropTypes.string.isRequired,
  bid: PropTypes.number.isRequired,
  ask: PropTypes.number.isRequired,
  direction: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
}

export default connect(null)(Quote)
