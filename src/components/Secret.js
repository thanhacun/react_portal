import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { login } from '../actions/secretActions'
class Secret extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
      //Check user login
  }

  handleChange(event, type){
    this.setState({[type]: event.target.value});
  }

  handleSubmit(event){
    //alert('Submited ' + this.state.email + 'wit password ' + this.state.password);
    this.props.login(this.state.email, this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h3>Secret information</h3>
        {(this.props.userLogin)
          ? <p className="strong text-danger">Secret message</p>
          : <div className="text-warning">
              <p>You need to login to see the information here</p>
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl type="email" value={this.state.email} onChange={(e) => this.handleChange(e, 'email')}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" value={this.state.password} onChange={(e) => this.handleChange(e, 'password')}/>
                </FormGroup>
                <Button type="submit" bsStyle="primary">Login</Button>
                {/* <input type="submit" value="Submit" /> */}
              </form>

            </div>
        }
      </div>
    )
  }
};

const mapStateToProps = store => {
  return store.secret
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Secret);
