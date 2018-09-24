import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
} from 'reactstrap'

export const UserInfo = (
  {
    followers, email, name, company, location, public_repos,
  },
) => (
  <React.Fragment>
    <h2>User Info</h2>
    <Table size='xs'>
      <tbody>
        <tr>
          <th>Name</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{email}</td>
        </tr>
        <tr>
          <th>Company</th>
          <td>{company}</td>
        </tr>
        <tr>
          <th>Location</th>
          <td>{location}</td>
        </tr>
        <tr>
          <th>Followers</th>
          <td>{followers}</td>
        </tr>
        <tr>
          <th>Public repos</th>
          <td>{public_repos}</td>
        </tr>
      </tbody>
    </Table>
  </React.Fragment>
)

UserInfo.propTypes = {
  followers: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  company: PropTypes.string,
  location: PropTypes.string,
  public_repos: PropTypes.number,
}

UserInfo.defaultProps = {
  followers: undefined,
  email: '',
  name: '',
  company: '',
  location: '',
  public_repos: undefined,
}
