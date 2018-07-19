import React from 'react'
const currencySymbol = currency => {
  switch (currency) {
    case 'USD' : return '$'
      break
    case 'EUR' : return '€'
      break
    default : return '$'
  }
}
const SuccessDeposit = props => {
  const {currency, amount} = props
  return (
    <div className='message-wrapper success'>
      <div className="status-icon">
        success
      </div>
      <div className="status-text">
        Deposit completed successfully! <br />
      Your account was funded with additional {currencySymbol(currency)} {amount}
      </div>
    </div>
  )
}


export default SuccessDeposit
