import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { goTo as fGoTo } from '../actions/goTo'
import fItemChange from '../actions/itemChange'

const currencySymbol = (currency) => {
  switch (currency) {
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    default:
      return '$'
  }
}

class SuccessDeposit extends Component {
  goSuccess = (currency, ammount) => {
    const { itemChange, goTo } = this.props
    console.log('got=', `${currency}${ammount}`)
    itemChange({})
    goTo('/')
  }

  render() {
    const { accountInfo: { currency, amount } } = this.props
    return (
      <div className='message-wrapper success'>
        <div>
          <div className='status-icon'>
            <i
              aria-hidden='true'
              className='far fa-check-circle'
            />
          </div>
          <div className='status-text'>
            Deposit completed successfully!
            <br />
            Your account was funded with
            <br />
            additional
            {' '}
            {currencySymbol(currency)}
            {' '}
            {amount}
          </div>
          <a className='button' onClick={() => this.goSuccess(currency, amount)}>
            Done
          </a>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  settings: state.deposit.data ? state.deposit.data.settings : {},
  accountInfo: state.deposit.data ? state.deposit.data.accountInfo : {},
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo: fGoTo,
  itemChange: fItemChange,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SuccessDeposit)
