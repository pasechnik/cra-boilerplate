import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap'
import { propsCategory } from '../models/category'
import CategoryCard from '../components/CategoryCard'
import { categoriesRootsSelector } from '../selectors'

const ListContainer = ({ categories, match: { path } }) => (
  <Container>
    <Row>
      <Col>
        <Breadcrumb tag="nav" listTag="div">
          <LinkContainer to={`${path}`}>
            <BreadcrumbItem tag="a" href={`${path}`}>
              Catalog
            </BreadcrumbItem>
          </LinkContainer>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col md={{ size: 12 }}>
        <div className="flex-grid">
          {categories.map(cat => (
            <CategoryCard
              key={`cc_${cat.id}`}
              id={cat.id}
              name={cat.name}
              description={cat.description}
              img={cat.img}
            />
          ))}
        </div>
      </Col>
    </Row>
  </Container>
)

ListContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(propsCategory.propTypes))
    .isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }).isRequired
}

const mapStateToProps = state => ({
  categories: categoriesRootsSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
