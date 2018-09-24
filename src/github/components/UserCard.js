import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Badge,
} from 'reactstrap'

export const UserCard = (
  {
    login, avatarUrl, htmlUrl, score, bio,
  },
) => (
  <React.Fragment>
    <h2>
      User:
      {login}
    </h2>
    <Card>
      <CardImg
        top
        width='100%'
        src={avatarUrl}
        alt={login}
      />
      <CardBody>
        <CardTitle>
          {login}
          {' '}
          <Badge color='secondary'>{Number.parseFloat(score).toFixed(2)}</Badge>
        </CardTitle>
        <CardSubtitle>
          <a href={htmlUrl}>{htmlUrl}</a>
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
  avatarUrl: PropTypes.string,
  htmlUrl: PropTypes.string,
  score: PropTypes.number,
  bio: PropTypes.string,
}

UserCard.defaultProps = {
  login: '',
  avatarUrl: '',
  htmlUrl: '',
  score: undefined,
  bio: '',
}

export default UserCard
