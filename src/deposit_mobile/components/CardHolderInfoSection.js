import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Button } from 'reactstrap'
import { FormControl, FormGroup } from 'react-bootstrap'
import { obj } from 'the-utils'

const CardHolderInfoSection = (props) => {
  const firstName = obj.deep(props, ['accountInfo', 'FIRSTNAME'], '')
  const lastName = obj.deep(props, ['accountInfo', 'LASTNAME'], '')
  const phone = obj.deep(props, ['accountInfo', 'PHONE'], '')
  const city = obj.deep(props, ['accountInfo', 'CITY'], '')
  const street = obj.deep(props, ['accountInfo', 'STREET'], '')
  const houseNum = obj.deep(props, ['accountInfo', 'HOUSENUMBER'], '')
  const address = `${city}${street}${houseNum}`
  return (
    <div className='card-user-information-wrapper'>
      <h4 className='deposit-title'>Card Holder Info</h4>
      <Row>
        <Col xs={{ size: 12 }}>
          <FormGroup>
            <FormControl
              name='FirstName'
              onChange={e => props.onTextChange(e, 'FirstName')}
              type='text'
              defaultValue={firstName}
              placeholder='First Name'
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 12 }}>
          <FormGroup>
            <FormControl
              name='LastName'
              onChange={e => props.onTextChange(e, 'LastName')}
              type='text'
              defaultValue={lastName}
              placeholder='Last Name'
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 12 }}>
          <FormGroup>
            <FormControl
              name='PHONE'
              onChange={e => props.onTextChange(e, 'PHONE')}
              type='number'
              defaultValue={phone}
              placeholder='Phone Number'
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 12 }}>
          <FormGroup>
            <FormControl
              name='Address'
              onChange={e => props.onTextChange(e, 'Address')}
              type='text'
              defaultValue={address}
              placeholder='Address'
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 12 }}>
          <Button onClick={props.handleDepositSend}>Confirm Payment</Button>
        </Col>
      </Row>
    </div>
  )
}

CardHolderInfoSection.propTypes = {
  onTextChange: PropTypes.func.isRequired,
  handleDepositSend: PropTypes.func.isRequired,
}

export default CardHolderInfoSection
