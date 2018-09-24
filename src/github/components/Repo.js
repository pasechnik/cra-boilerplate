import React from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'

const Repo = ({ htmlUrl, name }) => (
  <ListGroupItem>
    <a href={htmlUrl} target='_blank' rel='noopener noreferrer'>
      {name}
    </a>
  </ListGroupItem>
)

Repo.propTypes = {
  htmlUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
}

Repo.defaultProps = {
  htmlUrl: '',
}
export default Repo
