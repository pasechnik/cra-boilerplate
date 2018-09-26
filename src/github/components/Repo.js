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
          <a href={htmlUrl} target='_blank' rel='noopener noreferrer'>
            {name}
          </a>
          <br />
          <span className='fork'>{fork === true ? 'it\'s a fork' : ''}</span>
          <br />
          <span className='forks'>
            Forks:
            {' '}
            {forks}
          </span>
          <br />
          <span className='stars'>
            Stars:
            {' '}
            {stargazersCount}
          </span>
          <br />
          <span className='language'>
            Language:
            {' '}
            {language}
          </span>
          <br />
          <span className='homepage'>
            Homepage:
            {' '}
            {homepage}
          </span>
          <br />
          <span className='description'>
            Description:
            {' '}
            {description}
          </span>
        </ListGroupItemText>
      </ListGroupItem>
    )
  }
}

Repo.propTypes = {
  htmlUrl: PropTypes.string,
  name: PropTypes.string,
  fork: PropTypes.bool,
  forks: PropTypes.number,
  homepage: PropTypes.string,
  language: PropTypes.string,
  description: PropTypes.string,
  stargazersCount: PropTypes.number,
}

Repo.defaultProps = {
  homepage: '',
  htmlUrl: '',
  name: '',
  fork: false,
  forks: 0,
  language: '',
  description: '',
  stargazersCount: 0,
}
export default Repo
