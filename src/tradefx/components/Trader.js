import React from 'react'
import PropTypes from 'prop-types'
import {
  Container, Row, Col, Form, FormGroup, Label, Input, Button,
} from 'reactstrap'
import { TradeCell } from './TradeCell'
import '../style.css'

export const Trader = ({ pairs, amount, currencyFrom, currencyTo }) => (
  <React.Fragment>
    <h1 className='tradeheader'>Trader</h1>
    <Container className='trader' fluid>
      <Row>
        <Col
          md={{ size: 8, offset: 2 }}
          sm={{ size: 10, offset: 1 }}
          xs={{ size: 12, offset: 0 }}
        >
          <Container className='card' fluid>
            <Row className='card__top'>
              <Col md={12}>
                <Form inline>
                  <FormGroup row>
                    <Label for='pairSelect' className='mr-sm-2'>Pair</Label>
                    <Input type='select' name='pairSelect' id='pairSelect' className='mr-sm-2' bsSize='sm'>
                      {pairs.map(t => <option key={t}>{t}</option>)}
                    </Input>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row className='card__cell'>
              <TradeCell operation='sell' value={81.2} currency='EUR' />
              <TradeCell operation='buy' value={57.2} currency='EUR' />
            </Row>
            <Row className='card__bottom'>
              <Col md={12}>
                <Row>
                  <Col
                    className='card__bottom__form'
                    xs={12}
                    sm={12}
                    md={12}
                  >
                    <div className='card__bottom__form__cell from'>
                      <div className='card__bottom__form__cell--from-currency'>{currencyFrom}:</div>
                      <Input
                        type='text'
                        className='card__bottom__form__cell--from-ammount'
                        name='pair1'
                        id='pair1'
                        value={amount}
                      />
                    </div>
                    <div className='card__bottom__form__cell to'>
                      <div className='card__bottom__form__cell--to-currency'>
                        {currencyTo}
                        :
                      </div>
                      <div className='card__bottom__form__cell--to-amount'>{amount}</div>
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

Trader.propTypes = {
  pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
  amount: PropTypes.number.isRequired,
  currencyFrom: PropTypes.number.isRequired,
  currencyTo: PropTypes.number.isRequired,
}

export default Trader
