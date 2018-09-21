import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { arr } from 'the-utils'
import {
  setModal, setLoading, sendNotification, setModalSuccess,
} from '../actions/modal'

class DepositModal extends Component {
  static propTypes = {
    deposit: PropTypes.shape({
      status: PropTypes.string,
      success: PropTypes.bool,
      the3d_params: PropTypes.shape({
        popupWindow: PropTypes.object,
        PaReq: PropTypes.string,
        MD: PropTypes.string,
        sendMethod: PropTypes.string,
      }),
      seccess_url: PropTypes.string,
      the3d_url: PropTypes.string,
      err: PropTypes.string,
      iframeSrc: PropTypes.string,
    }).isRequired,
    doSetModal: PropTypes.func.isRequired,
    lang: PropTypes.shape({
      mz_cashier_deposit_failed: PropTypes.string,
      mz_cashier_deposit_failed2: PropTypes.string,
      mz_cashier_force_new_cc: PropTypes.string,
    }).isRequired,
    depositData: PropTypes.shape({
      MT4AccountNumber: PropTypes.number,
      amount: PropTypes.number,
    }).isRequired,
    doSendNotification: PropTypes.func.isRequired,
    doSetModalSuccess: PropTypes.func.isRequired,
  }

  state = {
    show: false,
    btn_visible: false,
    titleMsg: '',
    bodyMsg: '',
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    const {
      deposit: {
        status,
        success,
        err,
        //     the3d_params, the3d_url, seccess_url, force_new_cc,
      },
        depositData: { MT4AccountNumber, amount },
        lang: {
          mz_cashier_deposit_failed,
          mz_cashier_deposit_failed2,
          mz_cashier_force_new_cc,
        },
        doSendNotification, doSetModalSuccess,
    } = props

    console.log('nextprops', props, state)

    if (success === true && status === 'Pending') {

    }

    if (status !== undefined && Boolean(success) === true) {

      // popup Window case
      if (the3d_params.popupWindow) {
        this.openWindowWithPost(the3d_url, the3d_params)
        return
      }

      // seccess_url case
      if (seccess_url !== '' && seccess_url !== undefined) {
        doSendNotification(MT4AccountNumber, amount, 'success')
        this.setState({
          show: true,
          titleMsg: 'Success',
          bodyMsg: 'You will be redirected',
        })
        setTimeout(() => {
          window.location.href = seccess_url
          this.setState({ show: false })
        }, 2000)
      }

      // the3d_url case
      if (the3d_url !== undefined && the3d_url !== '') {
        doSetModalSuccess(nextProps.deposit)
      }
    } else if (force_new_cc && force_new_cc === true) {
      doSendNotification(MT4AccountNumber, amount, 'failed')
      this.setState({
        show: true,
        titleMsg: mz_cashier_deposit_failed,
        bodyMsg: mz_cashier_force_new_cc,
      })
    } else if (status === 'Failed' || success === false || success === 'false') {
      doSendNotification(MT4AccountNumber, amount, 'failed')
      this.setState({
        show: true,
        titleMsg: mz_cashier_deposit_failed,
        bodyMsg: (err !== '' && err !== false) ? err : mz_cashier_deposit_failed2,
      })
    }

    return null
  }

  // static UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps')
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps')
  //   const {
  //     lang: {
  //       mz_cashier_deposit_failed,
  //       mz_cashier_deposit_failed2,
  //       mz_cashier_force_new_cc,
  //     },
  //     doSendNotification, doSetModalSuccess,
  //   } = this.props
  //   const {
  //     deposit: {
  //       status, success, err,
  //       the3d_params, the3d_url, seccess_url, force_new_cc,
  //     },
  //     depositData: { MT4AccountNumber, amount },
  //   } = nextProps
  //
  //   console.log('nextprops', nextProps, this.state)
  //   if (status !== undefined && Boolean(success) === true) {
  //
  //     // popup Window case
  //     if (the3d_params.popupWindow) {
  //       this.openWindowWithPost(the3d_url, the3d_params)
  //       return
  //     }
  //
  //     // seccess_url case
  //     if (seccess_url !== '' && seccess_url !== undefined) {
  //       doSendNotification(MT4AccountNumber, amount, 'success')
  //       this.setState({
  //         show: true,
  //         titleMsg: 'Success',
  //         bodyMsg: 'You will be redirected',
  //       })
  //       setTimeout(() => {
  //         window.location.href = seccess_url
  //         this.setState({ show: false })
  //       }, 2000)
  //     }
  //
  //     // the3d_url case
  //     if (the3d_url !== undefined && the3d_url !== '') {
  //       doSetModalSuccess(nextProps.deposit)
  //     }
  //   } else if (force_new_cc && force_new_cc === true) {
  //     doSendNotification(MT4AccountNumber, amount, 'failed')
  //     this.setState({
  //       show: true,
  //       titleMsg: mz_cashier_deposit_failed,
  //       bodyMsg: mz_cashier_force_new_cc,
  //     })
  //   } else if (status === 'Failed' || success === false || success === 'false') {
  //     doSendNotification(MT4AccountNumber, amount, 'failed')
  //     this.setState({
  //       show: true,
  //       titleMsg: mz_cashier_deposit_failed,
  //       bodyMsg: (err !== '' && err !== false) ? err : mz_cashier_deposit_failed2,
  //     })
  //   }
  // }

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  confirmPayment = () => {
    const {
      doSetModal,
    } = this.props

    doSetModal(this.state)
  }

  createMarkup = i => ({ __html: i })

  createMarkupDiv = (i, index) => (i !== false ? (<div dangerouslySetInnerHTML={{ __html: i }} key={index} />) : null)

  initPixels() {
    const {
      deposit: { pixels = [] },
    } = this.props

    return arr.isArray(pixels) && pixels.length > 0 ? pixels.map(this.createMarkupDiv) : null
  }

  openWindowWithPost(url, data) {
    const form = document.createElement('form')
    const windowoption = 'resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1'
    form.target = 'mz_cashier_3d_sec_frame'
    form.method = 'POST'
    form.action = url
    form.style.display = 'none'

    Object.keys(data).forEach((key) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = data[key]
      form.appendChild(input)
    })

    document.body.appendChild(form)

    window.mz_cashier_3d_sec_frame = window.open(url, 'mz_cashier_3d_sec_frame', windowoption)
    form.submit()
  }


  render() {
    const {
      show,
      titleMsg,
      btn_visible,
    } = this.state
    const {
      lang: {
        mz_cashier_ok,
        mz_cashier_deposit_failed,
        mz_cashier_deposit_failed2,
        mz_cashier_force_new_cc,
      },
      deposit,
      deposit: {
        err,
        status,
        success,
        iframeSrc,
        // the3d_params, the3d_url, seccess_url, force_new_cc,
      },
      depositData: { MT4AccountNumber, amount },
      doSendNotification, doSetModalSuccess,
    } = this.props

    if (success === true && status === 'Pending') {

    }

    console.log(this.state, this.props)
    const pixelsFire = this.initPixels()
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {titleMsg}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id='pixels-fire'>
            {pixelsFire}
          </div>
          {err}
          {iframeSrc ? <iframe id='modal-frame' title='modal-frame' src={iframeSrc} /> : null}
        </Modal.Body>
        <Modal.Footer>
          {btn_visible ? (
            <Button onClick={deposit ? this.handleClose : this.confirmPayment}>
              {mz_cashier_ok}
            </Button>) : null
          }
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  deposit: state.deposit.common.deposit,
  lang: state.deposit.data.settings.lang,
  depositData: state.deposit.common.deposit_data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  doSetModal: setModal,
  doSetModalSuccess: setModalSuccess,
  doSendNotification: sendNotification,
  doSetLoading: setLoading,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)
