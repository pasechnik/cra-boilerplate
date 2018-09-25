import React from 'react'
import {
  Container, Row, Col,
} from 'reactstrap'
import { TradeCell } from './TradeCell'
import '../style.css'

export const Trader = () => (
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
            <Row className='card--top'>
              <Col md={12}>
              </Col>
            </Row>
            <Row className='card--cell'>
              <TradeCell operation='sell' value={81.2} currency='EUR' />
              <TradeCell operation='buy' value={57.2} currency='EUR' />
            </Row>
            <Row className='card--bottom'>
              <Col md={12}>CONTROL</Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  </React.Fragment>
)

export default Trader
