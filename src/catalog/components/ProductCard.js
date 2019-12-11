import React from 'react'
import * as PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  CardSubtitle
} from 'reactstrap'

export const ProductCard = ({ name, price, description, img }) => (
  <Card className="flex-col">
    <CardBody>
      <CardTitle>{name}</CardTitle>
      <CardSubtitle>Price: $ {price}</CardSubtitle>
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
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}

export default ProductCard
