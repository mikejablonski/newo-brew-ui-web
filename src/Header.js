import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                <NavItem><Link to="/brew">Brew</Link></NavItem>
                <NavItem><Link to="/history">History</Link></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
    );
  }
}

export default Header;