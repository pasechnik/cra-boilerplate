import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Badge,
} from 'reactstrap'

export const UserCard = ({
  login, avatar_url, html_url, score, bio,
}) => (
  <React.Fragment>
    <h2>
User:
      {login}
    </h2>
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
  </React.Fragment>
)

UserCard.propTypes = {
  login: PropTypes.string,
  avatar_url: PropTypes.string,
  html_url: PropTypes.string,
  score: PropTypes.number,
  bio: PropTypes.string,
}

UserCard.defaultProps = {
  login: '',
  avatar_url: '',
  html_url: '',
  score: undefined,
  bio: '',
}
