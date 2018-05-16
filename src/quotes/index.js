import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Indicators from './containers/Indicators'
// import './style.css'

function Quotes() {
  return (
    <div id='quotes'>
      <Container>
        <Row>
          <Col>
            <h2 className='text-center'>Quotes</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Indicators />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Quotes