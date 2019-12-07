import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

export const TradeCell = ({ value, operation, currency }) => (
  <Col className={`box ${operation}`}>
    <Row>
      <Col className={`box__top ${operation}`}>
        <div>
          {operation.toUpperCase()} {currency.toUpperCase()}
        </div>
        <div>1.40</div>
      </Col>
    </Row>
    <Row className="box__bottom">
      <Col md={12}>
        <span className="box__bottom__round">{Math.round(value)}</span>
        <span className="box__bottom__decimal">{`${value}`.split('.')[1]}</span>
      </Col>
    </Row>
  </Col>
)

TradeCell.propTypes = {
  value: PropTypes.number.isRequired,
  operation: PropTypes.oneOf(['sell', 'buy']).isRequired,
  currency: PropTypes.string.isRequired,
}
export default TradeCell
