import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import config from '../../common/config'
import BlinkingDots from '../../common/components/BlinkingDots'
import Form from '../components/Form'
import CustomIframe from '../components/CustomIframe'
import Pixels from '../components/Pixels'
// import sendNotification from '../../common/actions/sendNotification'
import { sendNotification } from '../../../actions/modal'
import setResponse from '../../common/actions/setResponse'

class DepositModal extends Component {
  static redirect = (url, time) => {
    if (!url) return false
    setTimeout(() => {
      window.location.href = url
    }, time)
    return true
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { lang, response, amount, account } = nextProps
    const { status = false, redirect_url } = response
    const notification = {
      status: config.NOTIFICATION,
      MT4AccountNumber: config.MT4AccountNumber || account.MT4AccountNumber,
      amount: config.courseInfo.amount || amount,
    }
    const redirect = { status: status === 'Success', url: redirect_url || 'thank-you' } // eslint-disable-line camelcase

    let body = ''
    switch (status) {
      case 'Success':
        if (config.GA && window.ga) window.ga('send', 'event', 'Deposit')
        body = 'Deposit was enrolled'
        redirect.status = true
        break
      case 'Failed':
      case 'Error':
        body = lang.mz_cashier_deposit_failed2
        break
      case 'Pending':
      default:
        break
    }

    if (status !== prevState.title) {
      return {
        show: Boolean(status),
        title: status,
        body,
        redirect,
        notification,
      }
    }
    return null
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      show: false,
      title: '',
      body: '',
      redirect: {},
      notification: {},
    }
  }

  componentDidUpdate() {
    const { lang, response } = this.props
    const { notification, redirect } = this.state

    window.fail3DSecureCallback = text => {
      this.props.setResponse({ status: 'Failed', body: text || lang.mz_cashier_deposit_failed2 })
      this.closeChildWindow()
    }

    window.success3DSecureCallback = (guid, text) => {
      this.props.setResponse({ status: 'Success', body: text || 'Deposit was enrolled' })
      this.closeChildWindow()

      // TradeLTD Feature
      const signatureInit = uid => {
        if (uid && window.modules && window.modules.depositSignature) {
          window.modules.depositSignature.setUID(uid)
          window.modules.depositSignature.init()
        }
      }
      signatureInit(guid)

      // TradeMy Feature
      const sendSuccessDepositGaEvent = () => {
        if (window.ga) window.ga('send', 'event', 'Deposit')
      }
      sendSuccessDepositGaEvent()

      if (!guid) {
        DepositModal.redirect(redirect.url, 3000)
      }
    }

    if (redirect.status) {
      DepositModal.redirect(redirect.url, 3000)
    }

    // Notification feature which works only for specific brands from config
    if (notification.status && response.status) {
      this.props.sendNotification(notification.MT4AccountNumber, notification.amount, response.status.toLowerCase())
    }
  }

  closeChildWindow = () => {
    if (window.popup) {
      window.popup.close()
    }
  }

  resetState = () => {
    this.props.setResponse({})
  }

  showMessage(title, body) {
    this.setState({
      show: true,
      title,
      body,
    })
  }

  render() {
    console.log('render deposit modal ')
    const { response } = this.props
    const { body, title } = this.state

    return (
      <Modal show={this.state.show} onHide={this.resetState}>
        <Modal.Header closeButton>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>
        <BlinkingDots dots={!body || title === 'Success'} text={response.body || body} active />
        <Modal.Body>
          <Pixels pixels={response.pixel} />
          <CustomIframe target={response.target} />
          <Form response={response} />
        </Modal.Body>
        <Modal.Footer className={title === 'Failed' ? 'visible' : 'hidden'}>
          <Button onClick={this.resetState}>{this.props.lang.mz_cashier_ok}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

DepositModal.defaultProps = {
  lang: {},
  response: {},
  setResponse: () => ({}),
  sendNotification: () => ({}),
}

DepositModal.propTypes = {
  lang: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  response: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  setResponse: PropTypes.func,
  sendNotification: PropTypes.func,
}

const mapStateToProps = state => ({
  response: state.deposit.common.response,
  account: state.deposit.data.accountInfo,
  amount: state.deposit.initial.amount,
  lang: state.deposit.data.settings.lang,
})

const mapDispatchToProps = {
  sendNotification,
  setResponse,
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)
