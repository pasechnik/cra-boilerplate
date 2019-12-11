import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import connect from 'react-redux/es/connect/connect'
import { Container, Row, Col } from 'reactstrap'
import { UserInfo } from '../components/UserInfo'
import { UserCard } from '../components/UserCard'
import { UserRepos } from '../components/UserRepos'
import UsersContainer from './Users'

import styles from '../styles/index.css'

/* eslint-disable react/jsx-props-no-spreading */
const GLayout = ({ user, userInfo, userRepos }) => (
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
        <UsersContainer />
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={6} md={6} lg={6} xl={4}>
        {user !== undefined ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <UserCard
            {...user}
            htmlUrl={get(user, 'html_url', '')}
            avatarUrl={get(user, 'avatar_url', '')}
          />
        ) : null}
      </Col>
      <Col xs={12} sm={6} md={6} lg={6} xl={4}>
        {user !== undefined ? (
          <UserInfo
            {...userInfo}
            publicRepos={get(userInfo, 'public_repos', 0)}
          />
        ) : null}
      </Col>
      <Col xs={12} sm={6} md={6} lg={6} xl={4}>
        {user !== undefined ? <UserRepos repos={userRepos} /> : null}
      </Col>
    </Row>
  </Container>
)
/* eslint-enable react/jsx-props-no-spreading */

GLayout.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}),
  userInfo: PropTypes.shape({})
}

GLayout.defaultProps = {
  users: [],
  user: undefined,
  userInfo: undefined
}

const mapStateToProps = state => ({
  loading: state.github.users.isLoading,
  user: state.github.users.user,
  userInfo: state.github.users.userInfo,
  userRepos: state.github.users.repos
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GLayout)
