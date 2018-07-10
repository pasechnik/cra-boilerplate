import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col, Label, Input,
} from 'reactstrap'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import { obj } from 'the-utils'

const months = []
const years = []
for (let i = 1; i <= 31; i += 1) {
  months.push(i)
  if (i < 15) {
    years.push(2018 + (i - 1))
  }
}

const CardInfoSection = (props) => {
  const creditCard = obj.deep(props, ['accountInfo', 'credit_card_number'], '')
  const cvv = obj.deep(props, ['accountInfo', 'exp_date_cvv'], '')
  return (
    <div className='card-number-wrapper'>
      <Row>
        <Col xs={{ size: 12 }} md={{ size: 12 }}>
          <FormGroup validationState={(creditCard.length !== 16 && !props.firstLoad.number) ? 'error' : null}>
            <ControlLabel>
Credit Card Number
            </ControlLabel>
            <FormControl
              name='credit_card_number'
              onChange={e => props.onTextChange(e, 'credit_card_number')}
              type='number'
              value={creditCard}
              pattern='[0-9]*'
              placeholder='XXXX XXXX XXXX XXXX'
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 9 }}>
          <Label for='exp_date'>
Expiration Date
          </Label>
          <Row>
            <Col xs={{ size: 5 }} className='month_div selectDiv'>
              <Input
                name='exp_date_month'
                onChange={e => props.onSelectChange(e, 'exp_date_month')}
                type='select'
                placeholder='MM'
              >
                {months.map(e => (
                  <option key={e}>
                    {e}
                  </option>
                ))}
              </Input>
            </Col>
            <Col xs={{ size: 6 }} className='selectDiv'>
              <Input
                name='exp_date_year'
                onChange={e => props.onSelectChange(e, 'exp_date_year')}
                type='select'
                placeholder='YY'
              >
                {years.map(e => (
                  <option key={e}>
                    {e}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </Col>
        <Col xs={{ size: 3 }} style={{ paddingLeft: 0 }}>
          <FormGroup validationState={(cvv.length !== 3 && !props.firstLoad.cvv) ? 'error' : null}>
            <ControlLabel>
CVV
            </ControlLabel>
            <FormControl
              name='exp_date_cvv'
              onChange={e => props.onTextChange(e, 'exp_date_cvv')}
              type='number'
              pattern='[0-9]*'
              value={cvv}
              placeholder='XXX'
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  )
}

CardInfoSection.propTypes = {
  firstLoad: PropTypes.shape({
    number: PropTypes.bool,
    cvv: PropTypes.bool,
  }).isRequired,
  onTextChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
}

export default CardInfoSection
