import React, { Component } from 'react';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';
import { facebookLogin, socialConnect, logout } from '../actions/userActions';

import SocialButton from './SocialButton';
import { Col, Row, Well } from 'react-bootstrap';

class UserProfile extends Component {
  componentDidUpdate(){
    //redirect to home if logout
    if (!this.props.userEmail && this.props.redirectTo) {
      this.props.goTo(this.props.redirectTo);
    }
  }
  render(){
    return(
      <div className="container">
        <div className="page-header text-center">
          <h1><span className="fa fa-anchor"></span> Profile Page</h1>
          <a onClick={this.props.logout} className="btn btn-default btn-sm">Logout</a>
        </div>
        <Row>

          {/* LOCAL INFORMATION */}
          <Col sm={6}>
            <Well>
              <h3><span className="fa fa-user"></span> Local</h3>
              {(this.props.local.email) ?
                <p>
                  {/* <strong>id</strong>: {this.props.local._id} <br /> */}
                  <strong>email</strong>: {this.props.local.email} <br/>
                  <strong>password</strong>: {this.props.local.password}

                  <a href="#" className="btn btn-default">Unlink</a>
                </p> :
                <a onClick={() => this.props.goTo('/connect/local')} className="btn btn-default">Connect Local</a>}
            </Well>
          </Col>

          {/* FACEBOOK INFORMATION */}
          <Col sm={6}>
            <Well>
              <h3 className="text-primary"><span className="fa fa-facebook"></span> Facebook</h3>
              {(this.props.facebook.token)
                ? <p>
                  <strong>id</strong>: {this.props.facebook.id} <br/>
                  <strong>token</strong>: {this.props.facebook.token} <br/>
                  <strong>email</strong>: {this.props.facebook.email} <br/>
                  <strong>name</strong>: {this.props.facebook.name} <br/>

                  <a href="#" className="btn btn-primary">Unlink</a>
                </p>
                : <SocialButton provider="facebook" appId="1565459906908844"
                  onLoginSuccess={(response) => this.props.facebookLogin(response)}
                  // onLoginFailure={handleSocialLoginFailer}
                  className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook
                </SocialButton> }
            </Well>
          </Col>
        </Row>
        <p>Test connect</p>
        {this.props.facebook.token ?
          <a onClick={() => this.props.socialConnect(this.props.facebook.token)} className="btn btn-primary">Connect Facebook</a>
          : "" }
      </div>
    );
  }
};

const mapStateToProps = store => store.user;

const mapDispatchToProps = dispatch => {
  return {
    goTo: (path) => dispatch(push(path)),
    socialConnect: (token) => dispatch(socialConnect(token)),
    facebookLogin: (loginUser) => dispatch(facebookLogin(loginUser)),
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
