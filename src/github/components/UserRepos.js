import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap'
import Repo from './Repo'

export const UserRepos = ({ repos = [] }) => (
  <React.Fragment>
    <h2>User Repos ({repos.length})</h2>
    <ListGroup className="repos">
      {repos.map(repo => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Repo
          key={repo.id}
          {...repo}
          htmlUrl={repo.html_url}
          stargazersCount={repo.stargazers_count}
        />
      ))}
    </ListGroup>
  </React.Fragment>
)

UserRepos.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      node_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      private: PropTypes.bool.isRequired,
      owner: PropTypes.shape({
        login: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        node_id: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        gravatar_id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        followers_url: PropTypes.string.isRequired,
        following_url: PropTypes.string.isRequired,
        gists_url: PropTypes.string.isRequired,
        starred_url: PropTypes.string.isRequired,
        subscriptions_url: PropTypes.string.isRequired,
        organizations_url: PropTypes.string.isRequired,
        repos_url: PropTypes.string.isRequired,
        events_url: PropTypes.string.isRequired,
        received_events_url: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        site_admin: PropTypes.bool.isRequired
      })
    })
  ).isRequired
}

UserRepos.defaultProps = {}

export default UserRepos
