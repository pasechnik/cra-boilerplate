import React from 'react'
import { Container, Row, Col, Button, Label, Input } from 'reactstrap'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
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
              name='firstName'
              onChange={e => props.onTextChange(e, 'firstName')}
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
              name='lastName'
              onChange={e => props.onTextChange(e, 'lastName')}
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
              name='phoneNumber'
              onChange={e => props.onTextChange(e, 'phoneNumber')}
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
              name='fullAddress'
              onChange={e => props.onTextChange(e, 'fullAddress')}
              type='text'
              defaultValue={address}
              placeholder='Address'
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 12 }}>
          <Button>Confirm Payment</Button>
        </Col>
      </Row>
    </div>
  )
}

export default CardHolderInfoSection
