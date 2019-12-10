import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { propsCategory } from '../models/category'

const SidebarContent = ({ categories }) => (
  <ul>
    {categories.map(cat => (
      <li key={cat.id}>
        <NavLink
          to={{ pathname: `./${cat.id}` }}
          href={`./${cat.id}`}
          className="cat-link"
          activeClassName="active_link"
        >
          {cat.name}
        </NavLink>
      </li>
    ))}
  </ul>
)

SidebarContent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(propsCategory.propTypes))
    .isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }).isRequired
}

export default withRouter(SidebarContent)
