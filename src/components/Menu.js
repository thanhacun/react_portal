import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

import { menuItems } from '../data/apps';
import { tcctMenuItems } from '../data/tcct';
import { getUserInfo } from '../actions/userActions';

class Menu extends Component {
  componentDidMount(){
    this.props.getUserInfo();
  }

  render(){
    return (
      <div className="container">
        <Navbar inverse collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand><a href="/">THCN's Apps</a></Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/map"><NavItem eventKey={1}>Projects Map</NavItem></LinkContainer>
              <NavDropdown eventKey={2} title="TCCT" id="tcct">
                {tcctMenuItems}
              </NavDropdown>
              <NavDropdown eventKey={3} title="Apps list" id="apps-dropdown">
                {menuItems}
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              {this.props.userEmail ?
                <LinkContainer to="/profile"><NavItem eventKey={1}>{this.props.userEmail}</NavItem></LinkContainer> :
                <LinkContainer to="/login"><NavItem eventKey={1}>Login</NavItem></LinkContainer>
              }
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
};

const mapStateToProps = (store) => {
  return store.user;
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(getUserInfo())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
