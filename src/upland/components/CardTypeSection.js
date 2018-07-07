import React from 'react'


const CardTypeSection = props => (
  <div>
    <div className='card-info-wrapper'>
      <h4 className='deposit-title'>Card information</h4>
      <ul>
        <li><img alt='Visa' className={props.cardType == 'Visa' ? 'active' : ''} src={require('../includes/img/Visa_Logo.png')} width='40' /></li>
        <li><img alt='MasterCard' className={props.cardType == 'Mastercard' ? 'active' : ''} src={require('../includes/img/MasterCard_logo.png')} width='40' /></li>
        <li><img alt='Maestro' className={props.cardType == 'Maestro' ? 'active' : ''} src={require('../includes/img/logo-maestro.png')} width='40' /></li>
      </ul>
    </div>
  </div>
)

export default CardTypeSection
