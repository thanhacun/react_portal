import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Auth from '../utils/Auth';

import SocialButton from './SocialButton';

import { Jumbotron, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { localLogin, getUserInfo, socialLogin } from '../actions/userActions';

//TODO: understand clearly dummy and smart components
//TODO: sharing common state between sliced reducers / routes

class UserLogin extends Component {
  constructor(props){
    super(props);
    this.state ={int_email: '', int_password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if (Auth.isUserAuthenticated()) {
      this.props.getUserInfo();
    }
  }

  componentDidUpdate(){
    //redirect to profile if loggedin
    if (this.props.userEmail && this.props.redirectTo) {
      this.props.goTo(this.props.redirectTo);
    }
  }

  handleChange(e, type){
    //ES6 dynamic object key
    this.setState({[type]: e.target.value});
  }

  handleSubmit(e){
    //alert(this.state.int_email + this.state.int_password);
    e.preventDefault();
    this.props.localLogin(this.state.int_email, this.state.int_password);
    this.setState({int_email: '', int_password: ''});
  }

  render(){
    return (
      <div className="container">
        <Jumbotron className="text-center">
          <h1><span className="fa fa-sign-in"></span> Login or Register with:</h1>
          {/* TODO: move appId to config file */}
          <SocialButton provider="facebook" appId="1565459906908844"
            onLoginSuccess={(response) => this.props.socialLogin(response)}
            // onLoginFailure={handleSocialLoginFailer}
            className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook
          </SocialButton>

          {/* <a onClick={this.props.facebookAuthToken} className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a> */}
          <a href="/api/users/auth/facebook" className="btn btn-info"><span className="fa fa-twitter"></span> Twitter</a>
          <a href="http://192.168.0.64:3036/api/users/auth/facebook" className="btn btn-danger"><span className="fa fa-google-plus"></span> Google</a>

        </Jumbotron>
        <h2> Local Login </h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" value={this.state.int_email} onChange={(e) => this.handleChange(e, 'int_email')}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" value={this.state.int_password} onChange={(e) => this.handleChange(e, 'int_password')} />
          </FormGroup>
          <Button type="submit" bsStyle="warning">Login</Button>
        </Form>
        <hr />
        <p>Need an account? <a onClick={() => this.props.goTo("/signup")}>Signup</a></p>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return store.user
}

const mapDispatchToProps = dispatch => {
  return {
    localLogin: (email, password) => dispatch(localLogin(email, password)),
    //facebookLogin: (loginUser) => dispatch(facebookLogin(loginUser)),
    goTo: (path) => dispatch(push(path)),
    getUserInfo: () => dispatch(getUserInfo()),
    socialLogin: (socialResponse) => dispatch(socialLogin(socialResponse))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);
