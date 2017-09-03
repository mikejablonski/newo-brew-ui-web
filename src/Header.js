import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {  
  render() {
    return (
        <Navbar inverse collapseOnSelect>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Newo Brew</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/brew">
                  <NavItem eventKey={1}>Brew</NavItem>
                </LinkContainer>
                <LinkContainer to="/history">
                  <NavItem eventKey={2}>History</NavItem>
                </LinkContainer>
                <LinkContainer to="/tools">
                  <NavItem eventKey={3}>Tools</NavItem>
                </LinkContainer>                
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
    );
  }
}

export default Header;