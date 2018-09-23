import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Row, Col } from 'reactstrap'
import { FormControl, FormGroup } from 'react-bootstrap'

const CardHolderInfoSection = ({ accountInfo, onTextChange }) => {
  const firstName = get(accountInfo, 'FIRSTNAME', '')
  const lastName = get(accountInfo, 'LASTNAME', '')
  const phone = get(accountInfo, 'PHONE', '')
  const city = get(accountInfo, 'CITY', '')
  const street = get(accountInfo, 'STREET', '')
  const houseNum = get(accountInfo, 'HOUSENUMBER', '')
  const address = `${city}${street}${houseNum}`
  return (
    <div className='card-user-information-wrapper'>
      <h4 className='deposit-title'>
        Card Holder Info
      </h4>
      <Row>
        <Col xs={{ size: 6 }}>
          <FormGroup>
            <FormControl
              name='FirstName'
              onChange={e => onTextChange(e, 'FirstName')}
              type='text'
              defaultValue={firstName}
              placeholder='First Name'
            />
          </FormGroup>
        </Col>
        <Col xs={{ size: 6 }}>
          <FormGroup>
            <FormControl
              name='LastName'
              onChange={e => onTextChange(e, 'LastName')}
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
              onChange={e => onTextChange(e, 'PHONE')}
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
              onChange={e => onTextChange(e, 'Address')}
              type='text'
              defaultValue={address}
              placeholder='Address'
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  )
}

CardHolderInfoSection.propTypes = {
  accountInfo: PropTypes.shape({
    FIRSTNAME: PropTypes.string,
    LASTNAME: PropTypes.string,
    PHONE: PropTypes.string,
    CITY: PropTypes.string,
    STREET: PropTypes.string,
    HOUSENUMBER: PropTypes.string,
  }).isRequired,
  onTextChange: PropTypes.func.isRequired,
}

export default CardHolderInfoSection
