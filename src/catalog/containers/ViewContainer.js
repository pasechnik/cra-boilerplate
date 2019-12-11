import React from 'react'
import PropTypes from 'prop-types'
import defaultTo from 'lodash/defaultTo'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { emptyCategory, propsCategory } from '../models/category'
import {
  makeCategoriesRequest as fMakeCategoriesRequest,
  makeCategoryRequest as fMakeCategoryRequest,
  makeProductsRequest as fMakeProductsRequest,
  setCategoryId as fSetCategoryId
} from '../actions/makeDataRequest'
import { categoriesAllSelector, productsAllSelector } from '../selectors'
import { propsProduct } from '../models/product'
import { ProductCard } from '../components/ProductCard'
import CatBreadCrumb from '../components/CatBreadCrumb'

function ViewContainer(props) {
  const {
    categories,
    products,
    match: {
      params: { id }
    }
  } = props
  const category = defaultTo(
    categories.find(cat => cat.id === id),
    emptyCategory
  )
  const catProducts = products.filter(prod => prod.categoryId === id)
  const catCategories = categories.filter(cat => cat.categoryId === id)
  const parent = defaultTo(
    categories.find(cat => cat.id === category.categoryId),
    emptyCategory
  )

  // console.log({
  //   id,
  //   categories,
  //   category,
  //   catCategories,
  //   catProducts,
  //   parent
  // })

  if (category.id !== id) {
    return (
      <Container>
        <Row>
          <Col>
            <CatBreadCrumb category={category} parent={parent} />
          </Col>
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
        <Col>
          <CatBreadCrumb category={category} parent={parent} />
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 3 }}>
          {/* <SideNav categories={categories}/> */}
          <ListGroup>
            <ListGroupItem>
              <Link
                className="cat-link"
                to={
                  parent.id !== emptyCategory.id ? `./${parent.id}` : './list'
                }
              >
                ...
              </Link>
            </ListGroupItem>
            {catCategories.map(cat => (
              <ListGroupItem key={`cats_${cat.id}`}>
                <Link to={`./${cat.id}`} className="cat-link">
                  {cat.name}
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={{ size: 9 }}>
          <div className="flex-grid">
            {catProducts.map(prod => (
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

ViewContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  // category: PropTypes.shape(propsCategory.propTypes).isRequired,
  // parent: PropTypes.shape(propsCategory.propTypes).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(propsCategory.propTypes))
    .isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(propsProduct.propTypes))
    .isRequired
  // makeCategoriesRequest: PropTypes.func.isRequired,
  // makeCategoryRequest: PropTypes.func.isRequired,
  // setCategoryId: PropTypes.func.isRequired,
  // makeProductsRequest: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: productsAllSelector(state),
  categories: categoriesAllSelector(state)
  // category: categorySelector(state),
  // parent: categoryParentSelector(state)
})

const mapDispatchToProps = {
  makeCategoryRequest: fMakeCategoryRequest,
  makeProductsRequest: fMakeProductsRequest,
  makeCategoriesRequest: fMakeCategoriesRequest,
  setCategoryId: fSetCategoryId
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer)
