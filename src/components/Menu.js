import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import appsList from '../data/apps';
import { getUserInfo } from '../actions/userActions';
//import Auth from '../utils/Auth';

const menuItems = appsList.map(function(item, key){
  if (item.menu) {//Only create menu if having menu value
    return (
      <LinkContainer to={item.path} key={`link_${item.id}`}><MenuItem key={`key_${key}`} eventKey={`${key}.${item.id}`}>{item.des}</MenuItem></LinkContainer>
    );
} else {
  return null;
}
});

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
              {/* <NavItem eventKey={1}><Link to="/map">Projects Map</Link></NavItem> */}
              <NavItem eventKey={2} href="/">Main 02</NavItem>
              <NavDropdown eventKey={3} title="Apps list" id="apps-dropdow">
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
