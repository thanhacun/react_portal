import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { localLogin } from '../actions/userActions';

class UserConnect extends Component {
  constructor(props){
    super(props);
    this.state = {int_email: '', int_password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e, type){
    this.setState({[type]: e.target.value})
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.localLogin(this.state.int_email, this.state.int_password);
  };

  render(){
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" name="email" value={this.state.int_email} onChange={(e) => this.handleChange(e, "int_email")}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" name="password" value={this.state.int_password} onChange = {(e) => this.handleChange(e, "int_password")}/>
          </FormGroup>
          <Button type="submit" bsStyle="warning" bsSize="large">Add Local</Button>
        </Form>
      </div>
    );
  }
};

const mapStateToProps = store => {
  return store.user;
};

const mapDispatchToProps = dispatch => {
  return {
    localLogin: (email, password) => dispatch(localLogin(email, password))
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserConnect);
