import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { propsCategory } from '../models/category'
import {
  makeCategoriesRequest as fMakeCategoriesRequest,
  makeCategoryRequest as fMakeCategoryRequest,
  makeProductsRequest as fMakeProductsRequest
} from '../actions/makeDataRequest'
import {
  categoriesByParentSelector,
  categorySelector,
  productsByParentSelector
} from '../selectors'
import { propsProduct } from '../models/product'
import { ProductCard } from '../components/ProductCard'

class ViewContainer extends React.Component {
  componentDidMount() {
    const {
      category,
      match: {
        params: { id }
      },
      makeCategoryRequest,
      makeCategoriesRequest,
      makeProductsRequest
    } = this.props

    if (category.id !== id) {
      makeCategoriesRequest()
      makeProductsRequest()
      makeCategoryRequest(id)
    }
  }

  render() {
    const {
      category,
      categories,
      products,
      match: {
        params: { id }
      }
    } = this.props
    console.log({ category, categories, products })

    const breadcrumb = (
      <Breadcrumb tag="nav" listTag="div">
        <LinkContainer to="./list">
          <BreadcrumbItem tag="a" href="./list" className="cat-link">
            Catalog
          </BreadcrumbItem>
        </LinkContainer>
        <LinkContainer to={`${category.id}`}>
          <BreadcrumbItem tag="a" href={`${category.id}`} active>
            {category.name}
          </BreadcrumbItem>
        </LinkContainer>
      </Breadcrumb>
    )

    if (category.id !== id) {
      return (
        <Container>
          <Row>
            <Col>{breadcrumb}</Col>
          </Row>
          <Row>
            <Col md={{ size: 12 }}>Category is not found</Col>
          </Row>
        </Container>
      )
    }

    return (
      <Container>
        <Row>
          <Col>{breadcrumb}</Col>
        </Row>
        <Row>
          <Col md={{ size: 3 }}>
            {/* {id}: {category.id}: {category.name} */}
            {/* <SideNav categories={categories}/> */}
            {categories.map(cat => (
              <div key={`cats_${cat.id}`}>{cat.name}</div>
            ))}
          </Col>
          <Col md={{ size: 9 }}>
            <div className="flex-grid">
              {products.map(prod => (
                <ProductCard
                  key={`prod_${prod.id}`}
                  id={prod.id}
                  name={prod.name}
                  price={prod.price}
                  description={prod.description}
                  img={prod.img}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

ViewContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  category: PropTypes.shape(propsCategory.propTypes).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(propsCategory.propTypes))
    .isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(propsProduct.propTypes))
    .isRequired,
  makeCategoriesRequest: PropTypes.func.isRequired,
  makeCategoryRequest: PropTypes.func.isRequired,
  makeProductsRequest: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: productsByParentSelector(state),
  categories: categoriesByParentSelector(state),
  category: categorySelector(state)
})

const mapDispatchToProps = {
  makeCategoryRequest: fMakeCategoryRequest,
  makeProductsRequest: fMakeProductsRequest,
  makeCategoriesRequest: fMakeCategoriesRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer)
