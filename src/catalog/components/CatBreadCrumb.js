import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import * as PropTypes from 'prop-types'
import { BreadcrumbItem, Breadcrumb } from 'reactstrap'
import { emptyCategory, propsCategory } from '../models/category'

const CatBreadCrumb = ({ category, parent }) => {
  const parentCrumb =
    parent.id !== emptyCategory.id ? (
      <React.Fragment>
        <BreadcrumbItem tag="span">...</BreadcrumbItem>
        <LinkContainer to={`${parent.id}`}>
          <BreadcrumbItem tag="a" href={`${parent.id}`} active>
            {parent.name}
          </BreadcrumbItem>
        </LinkContainer>
      </React.Fragment>
    ) : (
      ''
    )
  return (
    <Breadcrumb tag="nav" listTag="div">
      <LinkContainer to="./list">
        <BreadcrumbItem tag="a" href="./list" className="cat-link">
          Catalog
        </BreadcrumbItem>
      </LinkContainer>
      {parentCrumb}
      <LinkContainer to={`${category.id}`}>
        <BreadcrumbItem tag="a" href={`${category.id}`} active>
          {category.name}
        </BreadcrumbItem>
      </LinkContainer>
    </Breadcrumb>
  )
}

CatBreadCrumb.propTypes = {
  category: PropTypes.shape(propsCategory.propTypes).isRequired,
  parent: PropTypes.shape(propsCategory.propTypes).isRequired
}

export default CatBreadCrumb
