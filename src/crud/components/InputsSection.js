import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Label } from 'reactstrap'

const InputsSection = ({ textFieldChange, item }) => (
  <div>
    <Row style={{ paddingBottom: 20 }}>
      <Col md={{ size: 5 }}>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          onChange={e => textFieldChange('name', e.target.value)}
          value={item.name}
        />
      </Col>
      <Col md={{ size: 1 }} />
      <Col md={{ size: 5 }}>
        <Label for="friendlyName">Friendly Name</Label>
        <Input
          type="text"
          name="friendlyName"
          id="friendlyName"
          onChange={e => textFieldChange('friendlyName', e.target.value)}
          value={item.friendlyName}
        />
      </Col>
    </Row>
    <Row>
      <Col md={{ size: 5 }}>
        <Label for="address">Address</Label>
        <Input
          type="text"
          name="address"
          id="address"
          onChange={e => textFieldChange('address', e.target.value)}
          value={item.address}
        />
      </Col>
    </Row>
  </div>
)

InputsSection.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    friendlyName: PropTypes.string,
    address: PropTypes.string
  }).isRequired,
  textFieldChange: PropTypes.func.isRequired
}

export default InputsSection
