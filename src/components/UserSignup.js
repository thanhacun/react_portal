import React, { Component } from 'react';
import { connect } from 'react-redux';

import SocialButton from './SocialButton';

import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import { localSignup, socialSignup } from '../actions/userActions';


//TODO: understand clearly dummy and smart components
//TODO: redux-form

class UserSignup extends Component {
  constructor(props){
    super(props);
    this.state ={int_email: '', int_password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type){
    //ES6 dynamic object key
    this.setState({[type]: e.target.value});
  }

  handleSubmit(e){
    //alert(this.state.int_email + this.state.int_password);
    this.props.localSignup(this.state.int_email, this.state.int_password);
    this.setState({int_email: '', int_password: ''});
    e.preventDefault();
  }

  render(){
    return (
      <div className="container">
        <h1>Local signin</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl type="email" value={this.state.int_email} onChange={(e) => this.handleChange(e, 'int_email')}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" value={this.state.int_password} onChange={(e) => this.handleChange(e, 'int_password')} />
            </FormGroup>
            <Button type="submit" bsStyle="primary">Submit</Button>
          </Form>
        <br />
        <h1>Social signin</h1>
        <SocialButton provider="facebook" appId="1565459906908844"
          onLoginSuccess={(socialResponse) => this.props.socialSignup(socialResponse)}
          // onLoginFailure={handleSocialLoginFailer}
          className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook
        </SocialButton>
        {/* {this.props.facebook.token ? <Button onClick={this.props.facebookAPILogin(this.props.facebook.token)}></Button> : <span>Waiting for facebook token ...</span>} */}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return store.user
}

const mapDispatchToProps = dispatch => {
  return {
    localSignup: (email, password) => dispatch(localSignup(email, password)),
    socialSignup: (socialResponse) => dispatch(socialSignup(socialResponse))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSignup);
