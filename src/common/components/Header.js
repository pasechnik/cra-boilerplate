import React, { Component } from 'react'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'


class Header extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const depositPath = window.location.pathname === '/deposit'
    return (
      <header>
        <Container>
          <Navbar color='faded' light expand='md'>
            <IndexLinkContainer to='/'>
              <NavbarBrand>reactstrap</NavbarBrand>
            </IndexLinkContainer>
            <NavbarToggler onClick={this.toggle} style={depositPath ? {visibility: 'hidden'} : null} />
            <Collapse isOpen={this.state.isOpen} style={depositPath ? {visibility: 'hidden'} : null} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <IndexLinkContainer to='/'>
                    <NavLink>Home</NavLink>
                  </IndexLinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to='/about'>
                    <NavLink>About</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to='/crud/list'>
                    <NavLink>Crud</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to='/quotes'>
                    <NavLink>Quotes</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to='/deposit'>
                    <NavLink>Deposit</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to='/upland'>
                    <NavLink>Upland</NavLink>
                  </LinkContainer>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
    )
  }
}

export default Header
