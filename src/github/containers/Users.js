import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import {
  FormGroup, Label, Row, Col,
} from 'reactstrap'
import {
  doUsers as fUsers, doLoginSet as fLoginSet, doUserSet as fUserSet,
} from '../actions/doUsers'

import 'react-bootstrap-typeahead/css/Typeahead-bs4.css'

class Users extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    login: PropTypes.string.isRequired,
    doUsers: PropTypes.func.isRequired,
    doLoginSet: PropTypes.func.isRequired,
    doUserSet: PropTypes.func.isRequired,
  }

  render() {
    const {
      users, login, loading, doUsers, doLoginSet, doUserSet,
    } = this.props

    return (
      <Row>
        <Col md={2}>
          <Label for='login'>
            User login
          </Label>
        </Col>
        <Col md={10}>
          <FormGroup>
            <AsyncTypeahead
              isLoading={loading}
              labelKey='login'
              minLength={3}
              onSearch={doUsers}
              placeholder='Search for a Github user...'
              onChange={doUserSet}
              onInputChange={doLoginSet}
              options={users}
              defaultInputValue={login}
              // renderMenuItemChildren={(option, props) => (<li key={option.id} user={option} />)}
            />
          </FormGroup>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.github.users.isLoading,
  users: state.github.users.data,
  login: state.github.users.login,
  user: state.github.users.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  doUsers: fUsers,
  doLoginSet: fLoginSet,
  doUserSet: fUserSet,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Users)
