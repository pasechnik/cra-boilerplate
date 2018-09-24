import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

import '../styles/repo.css'

class Repo extends Component {
  state = {
    visible: false,
  }

  changeVisible = () => {
    const { visible } = this.state

    this.setState({ visible: !visible })
  }

  render() {
    const { visible } = this.state
    const {
      htmlUrl, name, fork, forks, homepage, language, description, stargazersCount,
    } = this.props

    return (
      <ListGroupItem>
        <ListGroupItemHeading onClick={this.changeVisible} className='listHeading'>
          {name}
        </ListGroupItemHeading>
        <ListGroupItemText style={{ display: (visible === true ? '' : 'none') }} className='listBody'>
          <div>
            <a href={htmlUrl} target='_blank' rel='noopener noreferrer'>
              {name}
            </a>
          </div>
          <div>{fork === true ? 'it\'s a fork' : ''}</div>
          <div>
            Forks:
            {forks}
          </div>
          <div>
            Stars:
            {stargazersCount}
          </div>
          <div>
            Language:
            {language}
          </div>
          <div>
            Homepage:
            {homepage}
          </div>
          <div>
            Description:
            {description}
          </div>
        </ListGroupItemText>
      </ListGroupItem>
    )
  }
}

Repo.propTypes = {
  htmlUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fork: PropTypes.bool.isRequired,
  forks: PropTypes.number.isRequired,
  homepage: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stargazersCount: PropTypes.string.isRequired,
}

export default Repo
