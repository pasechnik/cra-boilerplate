import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row, Col, Button, Form, FormGroup, Input, FormFeedback,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { goTo as fGoTo } from '../../common/actions/goTo'
import { verificateCodeStart as fVerificateCodeStart } from '../actions/verificateCode'
import HocModal from '../HOC/HocModal'


class CodeVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invalid: false,
      value: '',
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    const { value } = this.state
    const { requestId, verificateCodeStart, goTo } = this.props
    e.preventDefault()
    const code = value.trim()
    const pattern = /^[0-9]{4}$/g
    const res = code.search(pattern)
    if (res === -1) {
      this.setState({ invalid: true })
    } else {
      const payload = {
        code,
        requestId,
      }
      verificateCodeStart(payload)
      this.setState({ invalid: false })
      goTo('/quotes/')
    }
    return false
  }


  render() {
    const { value, invalid } = this.state
    return (
      <div>
        <div className='d-flex justify-content-between'>
          <Link
            to='/quotes/phone-verification/'
            href='/quotes/phone-verification/'
            className='quote_back-btn'
          >
            <span className='quote-modal_chevron'>
&#8249;
            </span>
          </Link>
          <h3 className='font-weight-bold text-center mb-3'>
            Verify your Phone
          </h3>
          <Link
            to='/quotes'
            href='/quotes'
            className='quote_close-btn'
          >
            ✕
          </Link>
        </div>
        <p className='px-4'>
          And we let you know when your Asset reached profile / lost boundaries
        </p>
        <hr />
        <Row>
          <Col
            md={{
              size: 6,
              offset: 3,
            }}
            xs={{
              size: 10,
              offset: 1,
            }}
          >
            <h5 className='quote_code-h4'>
              Please Enter here Code you received:
            </h5>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  autoFocus
                  className='text-center mt-3 py-2'
                  type='password'
                  name='code'
                  placeholder='1111'
                  value={value}
                  onChange={this.handleChange}
                  invalid={invalid}
                />
                <FormFeedback>
                  Enter valid code
                </FormFeedback>
              </FormGroup>
              <Button
                className='confirm-btn btn-lg btn-block mt-4'
              >
                Continue Trading
              </Button>
            </Form>
            <Link
              to='/quotes/phone-verification/'
              href='/quotes/phone-verification/'
              className='resend-btn btn-lg btn-block my-4 text-center'
            >
              Resend
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}

CodeVerification.propTypes = {
  goTo: PropTypes.func.isRequired,
  verificateCodeStart: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  requestId: state.quotes.phoneData.requestId,
})

const mapDispatchToProps = {
  goTo: fGoTo,
  verificateCodeStart: fVerificateCodeStart,
}

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(CodeVerification))
