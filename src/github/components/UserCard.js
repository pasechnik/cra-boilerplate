import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Badge,
} from 'reactstrap'

export const UserCard = ({ login, avatar_url, html_url, score, bio }) => (
  <Card>
    <CardImg
      top
      width='100%'
      src={avatar_url}
      alt={login}
    />
    <CardBody>
      <CardTitle>
        {login}
        {' '}
        <Badge color='secondary'>{Number.parseFloat(score).toFixed(2)}</Badge>
      </CardTitle>
      <CardSubtitle>
        <a href={html_url}>{html_url}</a>
      </CardSubtitle>
      <CardText>
        {bio}
      </CardText>
      <LinkContainer to={`/github/${login}`}>
        <Button>View Repos</Button>
      </LinkContainer>
    </CardBody>
  </Card>
)

UserCard.propTypes = {
  login: PropTypes.string,
  avatar_url: PropTypes.string,
  html_url: PropTypes.string,
  score: PropTypes.number,
  followers: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  company: PropTypes.string,
  bio: PropTypes.string,
  location: PropTypes.string,
  public_repos: PropTypes.number,
}

UserCard.defaultProps = {
  login: '',
  avatar_url: '',
  html_url: '',
  score: undefined,
  followers: undefined,
  email: '',
  name: '',
  company: '',
  bio: '',
  location: '',
  public_repos: undefined,
}
