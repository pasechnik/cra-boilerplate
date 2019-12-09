import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { category } from '../models/category'

const SidebarContent = ({ categories }) => (
  <ul>
    {categories.map(cat => (
      <li key={cat.id}>
        <NavLink
          to={{ pathname: `./${cat.id}` }}
          href={`./${cat.id}`}
          className="nav_btn"
          activeClassName="active_link"
        >
          {cat.name}
        </NavLink>
      </li>
    ))}
  </ul>
)

SidebarContent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(category.propTypes)).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }).isRequired
}

export default withRouter(SidebarContent)
