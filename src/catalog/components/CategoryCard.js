import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import * as PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
  CardImg
} from 'reactstrap'

const CategoryCard = ({ id, name, description, img }) => (
  <Card className="flex-col">
    <CardBody>
      <CardTitle>
        <Link to={`./${id}`} className="cat-link">
          {name}
        </Link>
      </CardTitle>
    </CardBody>
    <div className="crop">
      <CardImg width="100%" src={img} alt={name} className="crop-img" />
    </div>
    <CardBody>
      <CardText>{description}</CardText>
      <LinkContainer to={`./${id}`}>
        <Button href={`./${id}`} color="info">
          Info
        </Button>
      </LinkContainer>
    </CardBody>
  </Card>
)

CategoryCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}

export default CategoryCard
