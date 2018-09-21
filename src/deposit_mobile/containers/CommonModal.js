import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { obj } from 'the-utils'
import { setModal, setLoading, sendNotification } from '../actions/modal'

class CommonModal extends Component {
  static propTypes = {
    lang: PropTypes.shape({
      mz_cashier_deposit_failed2: PropTypes.string,
      mz_cashier_ok: PropTypes.string,
    }).isRequired,
    modal: PropTypes.shape({
      params: PropTypes.shape({}),
      url: PropTypes.string,
      show: PropTypes.bool,
      status: PropTypes.string,
      method: PropTypes.string,
    }).isRequired,
    deposit: PropTypes.shape({}).isRequired,
    depositData: PropTypes.shape({
      MT4AccountNumber: PropTypes.number,
      amount: PropTypes.number,
    }).isRequired,
    doSetModal: PropTypes.func.isRequired,
    doSendNotification: PropTypes.func.isRequired,
    doSetLoading: PropTypes.func.isRequired,
  }

  state = {
    success3DSecureCallback: false,
    fail3DSecureCallback: false,
    bodyMsg: '',
    depositData: {
      amount: 0,
      MT4AccountNumber: 0,
      status: false,
    },
  }

  constructor(props) {
    super(props)
    this.myForm = React.createRef()
  }

  componentDidMount() {
    const {
      doSendNotification, doSetLoading, doSetModal,
      lang: { mz_cashier_deposit_failed2 },
    } = this.props
    const {
      depositData: { MT4AccountNumber, amount },
    } = this.state

    window.success3DSecureCallback = () => {
      doSendNotification(MT4AccountNumber, amount, 'success')
      this.setState({
        success3DSecureCallback: true,
        fail3DSecureCallback: false,
        bodyMsg: 'Deposit was enrolled',
      })
      if (undefined !== window.mz_cashier_3d_sec_frame) {
        window.mz_cashier_3d_sec_frame.close()
      }
      doSetLoading(false)
      doSetModal({ show: false })
    }
    window.fail3DSecureCallback = () => {
      doSendNotification(MT4AccountNumber, amount, 'failed')
      this.setState({
        success3DSecureCallback: false,
        fail3DSecureCallback: true,
        bodyMsg: mz_cashier_deposit_failed2,
      })
      if (undefined !== window.mz_cashier_3d_sec_frame) {
        window.mz_cashier_3d_sec_frame.close()
      }
      doSetLoading(false)
      doSetModal({ show: true })
    }
  }

  onSubmit = () => {
    this.myForm.current.submit()
  }

  handleClose = () => {
    const {
      doSetModal,
    } = this.props

    doSetModal({
      show: false,
      // success3DSecureCallback: false,
      // fail3DSecureCallback: false,
      // bodyMsg: '',
    })
  }

  render() {
    const {
      deposit,
      modal: {
        params, url, show, status, method,
      },
      lang: { mz_cashier_ok },
    } = this.props
    const {
      bodyMsg,
      success3DSecureCallback,
      fail3DSecureCallback,
    } = this.state

    if (url !== undefined) {
      setTimeout(this.onSubmit, 0)
    }
    return show ? (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {status}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success3DSecureCallback ? (<h3 className='text-center'>{bodyMsg}</h3>) : null}
          {fail3DSecureCallback ? (<h3 className='text-center'>{bodyMsg}</h3>) : null}
          <iframe title='modal-frame' id='modal-frame' name='depositFrame' />
          {url !== undefined
            ? (
              <form
                action={url}
                method={method}
                target='depositFrame'
                ref={this.myForm}
              >
                {obj.isObject(params) && Object.keys(params).map(name => (
                  <input
                    key={name}
                    type='hidden'
                    name={name}
                    value={params[name]}
                  />
                ))}
              </form>
            ) : null
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deposit ? this.handleClose : ''}>
            {mz_cashier_ok}
          </Button>
        </Modal.Footer>
      </Modal>
    ) : null
  }
}

const mapStateToProps = state => ({
  modal: state.deposit.common.modal,
  deposit: state.deposit.common.deposit,
  depositData: state.deposit.common.deposit_data,
  lang: state.deposit.data.settings.lang,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  doSetModal: setModal,
  doSendNotification: sendNotification,
  doSetLoading: setLoading,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CommonModal)
// export default CommonModal
