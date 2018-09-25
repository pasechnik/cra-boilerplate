import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goToDispatch as fGoTo } from '../actions/goTo'
import { itemChange } from '../actions'

class ErrorDeposit extends Component {
  static propTypes = {
    response: PropTypes.shape({
      err: PropTypes.string,
    }).isRequired,
    doItemChange: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
  }

  goBack = () => {
    const { goTo, doItemChange } = this.props
    doItemChange({})
    goTo('/')
  }

  render() {
    const {
      response: { err },
    } = this.props

    return (
      <div className='message-wrapper error'>
        <div>
          <div className='status-icon'>
            <i aria-hidden='true' className='far fa-times-circle' />
          </div>
          <div className='status-text'>
            {err !== undefined && err.length ? err : 'Something went wrong!'}
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

const mapStateToProps = state => ({
  response: state.deposit.common.response,
})

const mapDispatchToProps = {
  goTo: fGoTo,
  doItemChange: itemChange,
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDeposit)
