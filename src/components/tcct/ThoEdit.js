import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, FormGroup, ControlLabel, Jumbotron,
  FormControl, Button} from 'react-bootstrap';

import { addTho, saveDraftTho } from '../../actions/tcctActions';

//TODO: handleChange is not DRY, how to rewrite it?
class ThoEdit extends Component {
  constructor(){
    super();

    this.state = {index: '', title: '', content: '', footer: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type){
    this.setState({[type]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    // Check authenticate
    if (this.props.user.userEmail) {
      // submit new Tho
      this.props.addTho(this.state);
      this.setState({index: '', title: '', content: '', footer: ''});
    } else {
      //TODO: DRY
      //save draft data
      this.props.saveDraftTho(this.state)
      this.props.goTo('/login');
    }

  }

  componentDidMount(){
    this.setState(this.props.draft || this.state)
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
            <ControlLabel>STT</ControlLabel>
            <FormControl type="number" value={this.state.index}
              onChange={(e) => this.handleChange(e, 'index')} required></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Tiêu đề</ControlLabel>
            <FormControl type="text" value={this.state.title}
              onChange={(e) => this.handleChange(e, 'title')} required></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nội dung</ControlLabel>
            <FormControl type="textarea" value={this.state.content}
              onChange={(e) => this.handleChange(e, 'content')} required></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Ghi chú</ControlLabel>
            <FormControl type="text" value={this.state.footer}
              onChange={(e) => this.handleChange(e, 'footer')} required></FormControl>
          </FormGroup>
          <Button type="submit" bsStyle="warning">Lưu</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => state.tcct;
const mapDispatchToProps = dispatch => ({
  addTho: (newTho) => dispatch(addTho(newTho)),
  saveDraftTho: (newTho) => dispatch(saveDraftTho(newTho)),
  goTo: (path) => dispatch(push(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThoEdit);
