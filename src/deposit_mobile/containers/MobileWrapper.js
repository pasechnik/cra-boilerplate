import React from 'react'
import FundsSection from '../components/FundsSection'
import CardTypeSection from '../components/CardTypeSection'
import CardInfoSection from '../components/CardInfoSection'
import CardHolderInfoSection from '../components/CardHolderInfoSection'

const MobileWrapper = props => {
  const {
    accountInfo, firstLoad, cardType, cardNumber, cvv,
  } = props
  return (
    <div className='deposit-mobile-wrapper'>
      <FundsSection onDepositChange={props.onDepositChange} />
      <CardTypeSection cardType={cardType} />
      <CardInfoSection
        cardNumber={cardNumber}
        cvv={cvv}
        onTextChange={props.onTextChange}
        onSelectChange={props.onSelectChange}
        firstLoad={firstLoad}
        accountInfo={accountInfo}
      />
      <CardHolderInfoSection
        handleDepositSend={props.handleDepositSend}
        accountInfo={accountInfo}
        onTextChange={props.onTextChange}
      />
    </div>
  )
}


export default MobileWrapper
