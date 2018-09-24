import PropTypes from 'prop-types'
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import {
  Container,
  Row,
  Col,
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import { UserInfo } from './UserInfo'
import { UserCard } from './UserCard'
import { UserRepos } from './UserRepos'
import Users from '../containers/Users'

import styles from '../styles/index.css'

class GLayoutClass extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({})),
    user: PropTypes.shape({}),
    userInfo: PropTypes.shape({}),
  }

  static defaultProps = {
    users: [],
    user: undefined,
    userInfo: undefined,
  }

  render() {
    const {
      user,
      userInfo,
      userRepos,
    } = this.props

    console.log({
      user,
      userRepos,
    })
    return (
      <Container fluid>
        <Row>
          <Col
            className={styles.TopCoL}
            xs={{ size: 12 }}
            sm={{ size: 12, offset: 0 }}
            md={{ size: 10, offset: 1 }}
            lg={{ size: 8, offset: 2 }}
            xl={{ size: 8, offset: 2 }}
          >
            <Users />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6} xl={4}>
            {user !== undefined ? <UserCard {...user} /> : null}
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={4}>
            {user !== undefined ? <UserInfo {...userInfo} /> : null}
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={4}>
            {user !== undefined ? <UserRepos repos={userRepos} /> : null}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.github.users.isLoading,
  user: state.github.users.user,
  userInfo: state.github.users.userInfo,
  userRepos: state.github.users.repos,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GLayoutClass)
