import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Button } from 'reactstrap'

const CardSubmitSection = ({ handleDepositSend }) => (
  <div className="card-user-information-wrapper">
    <Row>
      <Col xs={{ size: 12 }}>
        <Button onClick={handleDepositSend}>Confirm Payment</Button>
      </Col>
    </Row>
  </div>
)

CardSubmitSection.propTypes = {
  handleDepositSend: PropTypes.func.isRequired,
}

export default CardSubmitSection
