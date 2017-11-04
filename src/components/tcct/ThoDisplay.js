import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';

import jumbo_01 from './jumbo_bg_01.png';
import { getTho } from '../../actions/tcctActions';
import ThoIndex from './ThoIndex';

import { Jumbotron, Button, Row, Col, ButtonToolbar } from 'react-bootstrap';

class ThoDisplay extends Component {
  constructor(){
    super();
    this.state = {selectedID: 0};
    this.getRandom = this.getRandom.bind(this);
  }

  componentDidMount(){
    this.props.getTho();
  }

  getRandom(){
    //[X] TODO: avoid random same ID as current ID
    while (true){
      const randomID = Math.round(Math.random() * (this.props.tho.length - 1));
      if (randomID !== this.state.selectedID){
        this.setState({
          selectedID: randomID}
        );
        break;
      }
    }
  }

  render(){
    const jumboStyle = {
      backgroundImage: `url(${jumbo_01})`
    };

    if (this.props.busy) {
      return (
        // TODO better way to handle busy
        <div>BUSY...</div>
      )
    } else {
      // TODO: why thos[rndNumber].title is not available here
      const thoLength = this.props.tho.length;
      const { selectedID } = this.state;
      const ThoList = this.props.tho.map((tho) => {
        return (
          <div key={`list_${tho.index}`}>
             <h2>{tho.title}</h2>
             <session>
               {renderHTML(tho.content)}
             </session>
             <p>{tho.footer}</p>
          </div>
        )
      });

      return (
        <div className="container">
          <Jumbotron style={jumboStyle} className="text-center">
            <h2>TCCT - Thơ Kim Bồng Miêu</h2>
            <p>Tuyển tập các bài thơ hay của tác giả Kim Bồng Miêu</p>
          </Jumbotron>
          {/* Showing index in computer browser */}
          <Row>
            <Col xsHidden md={4}>
              <ThoIndex tho={this.props.tho} selectedID={this.state.selectedID}
                indexOnClick={(id) => {this.setState({selectedID: id})}}/>
            </Col>
            <Col xs={12} md={8} className='text-center'>
              {ThoList[this.state.selectedID]}
            </Col>
            <Col xs={12} md={8} mdOffset={4}>
              {/* Move to a component */}
              <ButtonToolbar>
                <Button bsStyle='default' disabled={(selectedID === 0) ? true : false}
                  onClick={() => this.setState({selectedID: selectedID - 1})}>Trước</Button>
                <Button bsStyle='success'>Mục lục</Button>
                <Button bsStyle='primary' onClick={this.getRandom}>Random</Button>
                <Button bsStyle='default' disabled={(selectedID === thoLength - 1) ? true : false}
                  onClick={() => this.setState({selectedID: selectedID + 1})}>Sau</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </div>
      );

    }
  }
}

const mapStateToProps = store => store.tcct;
const mapDispatchToProps = dispatch => ({
  getTho: () => dispatch(getTho())
});

export default connect(mapStateToProps, mapDispatchToProps)(ThoDisplay);
