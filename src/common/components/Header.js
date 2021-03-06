import React, { Component } from 'react'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

class Header extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isOpen: false
  }

  toggle = () => {
    const { isOpen } = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    const { isOpen } = this.state
    const depositPath = window.location.pathname === '/deposit'
    return (
      <header>
        <Container>
          <Navbar color="faded" light expand="md">
            <IndexLinkContainer to="/">
              <NavbarBrand>reactstrap</NavbarBrand>
            </IndexLinkContainer>
            <NavbarToggler
              onClick={this.toggle}
              style={depositPath ? { visibility: 'hidden' } : null}
            />
            <Collapse
              isOpen={isOpen}
              style={depositPath ? { visibility: 'hidden' } : null}
              navbar
            >
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <IndexLinkContainer to="/">
                    <NavLink>Home</NavLink>
                  </IndexLinkContainer>
                </NavItem>
                <NavItem>
                  <IndexLinkContainer to="/catalog">
                    <NavLink>Catalog</NavLink>
                  </IndexLinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to="/tradefx">
                    <NavLink>TradeFX</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to="/github">
                    <NavLink>Github UI</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to="/about">
                    <NavLink>About</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to="/crud/list">
                    <NavLink>Crud</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to="/upland">
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
