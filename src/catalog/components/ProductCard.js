import React from 'react'
import { Link } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  CardSubtitle
} from 'reactstrap'

export const ProductCard = ({ id, name, price, description, img }) => (
  <Card className="flex-col">
    <CardBody>
      <CardTitle>
        <Link to={`./${id}`} className="cat-link">
          {name}
        </Link>
      </CardTitle>
      <CardSubtitle>{price}</CardSubtitle>
    </CardBody>
    <div className="crop">
      <CardImg width="100%" src={img} alt={name} className="crop-img" />
    </div>
    <CardBody>
      <CardText>{description}</CardText>
    </CardBody>
  </Card>
)

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}

export default ProductCard
