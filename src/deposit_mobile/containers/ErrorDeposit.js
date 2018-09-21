import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { goToDispatch as fGoTo } from '../actions/goTo'
import { itemChange } from '../actions'

class ErrorDeposit extends Component {
  propTypes = {
    doItemChange: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
  }

  goBack = () => {
    const { goTo, doItemChange } = this.props
    doItemChange({})
    goTo('/')
  }

  render() {
    return (
      <div className='message-wrapper error'>
        <div>
          <div className='status-icon'>
            <i aria-hidden='true' className='far fa-times-circle' />
          </div>
          <div className='status-text'>
            Something went wrong!
            {' '}
            <br />
            Please try again later.
          </div>
          <a className='button' onClick={this.goBack}>
            Done
          </a>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo: fGoTo,
  doItemChange: itemChange,
}, dispatch)

export default connect(undefined, mapDispatchToProps)(ErrorDeposit)
