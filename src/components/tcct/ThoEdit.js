import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, FormGroup, ControlLabel, Jumbotron,
  FormControl, Button} from 'react-bootstrap';

class ThoEdit extends Component {
  constructor(){
    super();
    this.state = {title: '', content: '', footer: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type){
    this.setState({[type]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }

  render(){
    return (
      <div className="container">
        <Jumbotron className="text-center">
          <h2>TCCT - Kim Bồng Miêu</h2>
          <p>Nhập, sửa các bài thơ</p>
        </Jumbotron>
        <h2>Nhập liệu</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Tiêu đề</ControlLabel>
            <FormControl type="text" value={this.state.title}></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nội dung</ControlLabel>
            <FormControl type="textarea" value={this.state.content}></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Ghi chú</ControlLabel>
            <FormControl type="text" value={this.state.footer}></FormControl>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default connect()(ThoEdit);
