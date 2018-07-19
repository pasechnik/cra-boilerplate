import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import { goTo as fGoTo } from '../actions/goTo'
import fItemChange from '../actions/itemChange'

class ErrorDeposit extends Component {

  render(){
    // const {currency, amount} = props
    const currency = '$'
    const amount = '300'
    return (
      <div className='message-wrapper error'>
        <div>
          <div className="status-icon">
            <i aria-hidden="true"
              className="far fa-times-circle"
            ></i>
          </div>
          <div className="status-text">
            Something went wrong! <br/>
            Please try again later.
          </div>
          <a className="button" onClick={() => this.props.goTo('/')}>Done</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDeposit)
