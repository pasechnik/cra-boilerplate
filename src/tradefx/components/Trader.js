import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import { TradeCell } from './TradeCell'
import '../style.css'

export const Trader = ({ oPair, pairs, amount, currencyFrom, currencyTo, doChangePair }) => {
  // console.log(oPair)

  return (
    <React.Fragment>
      <h1 className="tradeheader">Trader</h1>
      <Container className="trader" fluid>
        <Row>
          <Col md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }}>
            <Container className="card" fluid>
              <Row className="card__top">
                <Col md={12}>
                  <Form inline>
                    <FormGroup row>
                      <Label for="pairSelect" className="mr-sm-2">
                        Pair
                      </Label>
                      <Input
                        id="pairSelect"
                        type="select"
                        className="mr-sm-2"
                        bsSize="sm"
                        onChange={event => doChangePair(event.target.value)}
                      >
                        {pairs.map(t => (
                          <option key={t}>{t}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              <Row className="card__cell">
                <TradeCell operation="sell" value={oPair.bid} currency={currencyFrom} />
                <TradeCell operation="buy" value={oPair.ask} currency={currencyFrom} />
              </Row>
              <Row className="card__bottom">
                <Col md={12}>
                  <Row>
                    <Col className="card__bottom__form" xs={12} sm={12} md={12}>
                      <div className="card__bottom__form__cell from">
                        <div className="card__bottom__form__cell--from-currency">{currencyFrom}:</div>
                        <Input
                          type="text"
                          className="card__bottom__form__cell--from-ammount"
                          name="pair1"
                          id="pair1"
                          value={amount}
                          onChange={e => console.log(e)}
                        />
                      </div>
                      <div className="card__bottom__form__cell to">
                        <div className="card__bottom__form__cell--to-currency">{currencyTo}:</div>
                        <div className="card__bottom__form__cell--to-amount">{amount}</div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

Trader.propTypes = {
  pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
  oPair: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    ask: PropTypes.number.isRequired,
    bid: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    direction: PropTypes.number.isRequired,
    digits: PropTypes.number.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  currencyFrom: PropTypes.string.isRequired,
  currencyTo: PropTypes.string.isRequired,
  doChangePair: PropTypes.func.isRequired,
}

export default Trader
