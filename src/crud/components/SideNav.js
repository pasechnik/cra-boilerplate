import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class SidebarContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const path = this.props.location.pathname
    return (
      <ul>
        <li>
          <NavLink
            to='/crud/list'
            className='nav_btn'
            activeClassName='active_link'
          >
            List
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/crud/add-new'
            className='nav_btn'
            activeClassName='active_link'
          >
            Add New Item
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/crud/edit'
            className='nav_btn'
            activeClassName='active_link'
          >
            Edit Item
          </NavLink>
        </li>
      </ul>
    )
  }
}

export default withRouter(SidebarContent)
