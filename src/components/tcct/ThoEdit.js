// TODO: using recompose to handle busy loading
// TODO: integrated richtext editor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, FormGroup, ControlLabel, Jumbotron, Row, Col,
  FormControl, Button} from 'react-bootstrap';
import RichTextEditor, { RawHTML } from '../RichTextEditor';

import ThoIndex from './ThoIndex';
import { addTho, saveDraftTho, getTho } from '../../actions/tcctActions';

//TODO: handleChange is not DRY, how to rewrite it?

class ThoEdit extends Component {
  constructor(props){
    super(props);

    this.state = {index: '', title: '', content: '', footer: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type){
    //console.log(e.target.value);
    this.setState({[type]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    // Check authenticate
    if (this.props.user.userEmail) {
      // submit new Tho
      this.props.addTho({ ...this.state, content: this.refs.content.state.rawHTML});
      this.setState({index: '', title: '', content: '', footer: '', addedIndex: 0});
    } else {
      //TODO: DRY
      this.props.saveDraftTho(this.state)
      this.props.goTo('/login');
    }

  }

  componentDidMount(){
    this.props.getTho();
    this.setState(this.props.draft || this.state);
  }

  render(){
    return (
      <div className="container">
        <Jumbotron className="text-center">
          <h2>TCCT - Kim Bồng Miêu</h2>
          <p>Nhập, sửa các bài thơ</p>
          <code>Khi sửa, chỉ nên sửa ở giao diện máy tính</code>
        </Jumbotron>
        {/* recompose branch here to show busy loading or content */}
        {/* recompose branch to show new form or edit form */}

        <Row>
          <Col md={4}><ThoIndex tho={this.props.tho}
            indexOnClick={(selectedID) => {this.setState(this.props.tho[selectedID])}} /></Col>
          <Col md={8}>
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
                    <RichTextEditor label="Code HTML tự sinh" ref="content"/>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Ghi chú</ControlLabel>
                    <FormControl type="text" value={this.state.footer}
                      onChange={(e) => this.handleChange(e, 'footer')} required></FormControl>
                    </FormGroup>
                    <Button type="submit" bsStyle="warning">Lưu</Button>
                  </Form>
          </Col>
          <Col md={8} mdOffset={4}></Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => state.tcct;
const mapDispatchToProps = dispatch => ({
  addTho: (newTho) => dispatch(addTho(newTho)),
  saveDraftTho: (newTho) => dispatch(saveDraftTho(newTho)),
  goTo: (path) => dispatch(push(path)),
  getTho: () => dispatch(getTho())
})

export default connect(mapStateToProps, mapDispatchToProps)(ThoEdit);
