import React from 'react'
import PropTypes from 'prop-types'

const Repo = ({ htmlUrl, name }) => (
  <li>
    <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  </li>
)

Repo.propTypes = {
  htmlUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Repo
