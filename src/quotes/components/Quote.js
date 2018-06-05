import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import classname from 'classname'


class Quote extends Component {
  render() {
    return (
      <Row>
        <Col xs='2' className='align-middle trader-pair_symbol d-flex align-items-center'>
          <strong>{this.props.symbol}</strong>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': this.props.direction === 0,
                'trader-down': this.props.direction > 0,
                'trader-zero': this.props.direction < 0,
              }
            )}
          >
            <Link to={`/quotes/list/${this.props.symbol}/sell`} href={`/quotes/list/${this.props.symbol}/sell`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleSell}
              >
                <strong> Sell</strong><br />
                <span>{this.props.bid}</span>
              </Button>
            </Link>
          </div>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': this.props.direction === 0,
                'trader-down': this.props.direction > 0,
                'trader-zero': this.props.direction < 0,
              }
            )}
          >
            <Link to={`/quotes/list/${this.props.symbol}/buy`} href={`/quotes/list/${this.props.symbol}/buy`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleBuy}
              >
                <strong>Buy</strong><br />
                <span>{this.props.ask}</span>
              </Button>
            </Link>
          </div>
        </Col>
        <Col
          xs='2'
          className='align-middle text-center  trader-pair_symbol d-flex align-items-center justify-content-center'
        >
          {this.props.direction < 0 ? '' :
          <i
            className={classname(
                ['fa'],
                {
                  'fa-caret-up': this.props.direction === 0,
                  'fa-caret-down': this.props.direction > 0,
                }
              )}
          />
          }
          <strong
            className={classname(
              ['pl-1'],
              {
                'trader-up': this.props.direction === 0,
                'trader-down': this.props.direction > 0,
                'trader-zero': this.props.direction < 0,
              }
            )}
          >
            {this.props.direction}&#37;
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
}

// const mapStateToProps = state => ({
//   sell: state.quotes.operation.sell,
//   buy: state.quotes.operation.buy,
// })

// const mapDispatchToProps = dispatch => bindActionCreators({
// }, dispatch)

export default connect(null)(Quote)
