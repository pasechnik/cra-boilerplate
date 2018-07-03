import React from 'react'
import { Container, Row, Col, Button, Label, Input } from 'reactstrap'
import { obj } from 'the-utils'

const CardHolderInfoSection = props => {
  const firstName = obj.deep(props, ['accountInfo','FIRSTNAME'], '')
  const lastName = obj.deep(props, ['accountInfo','LASTNAME'], '')
  const city = obj.deep(props, ['accountInfo','CITY'], '')
  const street = obj.deep(props, ['accountInfo','STREET'], '')
  const houseNum = obj.deep(props, ['accountInfo','HOUSENUMBER'], '')
  return(
    <div className="card-user-information-wrapper">
      <h4 className="deposit-title">Card Holder Info</h4>
      <Row>
        <Col xs={{size: 12}}>
          <Input name="full_name" value={`${firstName} ${lastName}`} onChange={(e) => props.onTextChange(e, 'full_name')} type="text" placeholder="Full Name" />
        </Col>
      </Row>
      <Row>
        <Col xs={{size: 12}}>
          <Input name="phone_number" value={obj.deep(props, ['accountInfo','PHONE'], '')} onChange={(e) => props.onTextChange(e, 'phone_number')} type="number" placeholder="Phone Number" />
        </Col>
      </Row>
      <Row>
        <Col xs={{size: 12}}>
          <Input name="full_address" value={`${city}, ${street} ${houseNum}`} onChange={(e) => props.onTextChange(e, 'full_address')} type="text" placeholder="Full Address" />
        </Col>
      </Row>
      <Row>
        <Col xs={{size: 12}}>
          <Button>Confirm Payment</Button>
        </Col>
      </Row>
    </div>
  )
}

export default CardHolderInfoSection
