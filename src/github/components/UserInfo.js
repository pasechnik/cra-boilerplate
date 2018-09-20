import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Badge,
} from 'reactstrap'

export const UserInfo = ({ login, avatar_url, html_url, score }) => (
  <Row>
    <Col>
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
            <Badge color='secondary'>{score}</Badge>
          </CardTitle>
          <CardSubtitle>
            <a href={html_url}>{html_url}</a>
          </CardSubtitle>
          <CardText>
            Some quick example text t¬o build on the card title and make up the bulk of the card's
            content.
          </CardText>
          <LinkContainer to={`/github/${login}`}>
            <Button>View Repos</Button>
          </LinkContainer>
        </CardBody>
      </Card>
    </Col>
  </Row>
)

UserInfo.propTypes = {
  login: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
}
