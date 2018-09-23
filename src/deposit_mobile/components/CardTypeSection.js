import React from 'react'
import PropTypes from 'prop-types'
import Visa from '../includes/img/Visa_Logo.png'
import Mastercard from '../includes/img/MasterCard_logo.png'
import Maestro from '../includes/img/logo-maestro.png'

const CardTypeSection = ({ cardType }) => (
  <div>
    <div className='card-info-wrapper'>
      <h4 className='deposit-title'>
        Card information
      </h4>
      <ul>
        <li>
          <img
            alt='Visa'
            className={cardType === 'Visa' ? 'active' : ''}
            src={Visa}
            width='40'
          />
        </li>
        <li>
          <img
            alt='MasterCard'
            className={cardType === 'MasterCard' ? 'active' : ''}
            src={Mastercard}
            width='40'
          />
        </li>
        <li>
          <img
            alt='Maestro'
            className={cardType === 'Maestro' ? 'active' : ''}
            src={Maestro}
            width='40'
          />
        </li>
      </ul>
    </div>
  </div>
)

CardTypeSection.propTypes = {
  cardType: PropTypes.string.isRequired,
}

export default CardTypeSection
