import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';

import jumbo_01 from './jumbo_bg_01.png';
import { getTho } from '../../actions/tcctActions';

import { Jumbotron, Button, Row, Col, ButtonToolbar } from 'react-bootstrap';

class ThoDisplay extends Component {
  constructor(){
    super();
    this.state = {random: 0};
    this.getRandom = this.getRandom.bind(this);
  }

  componentDidMount(){
    this.props.getTho();
  }

  getRandom(){
    this.setState({random:
      Math.round(Math.random() * (this.props.tho.length - 1) )});
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

      const ThoIndex = this.props.tho.map((tho) => {
        return (
          <li key={`index_${tho.index}`}>
            {`${tho.index}. ${tho.title} `}
          </li>
        );
      });

      return (
        <div className="container">
          <Jumbotron style={jumboStyle} className="text-center">
            <h2>TCCT - Thơ Kim Bồng Miêu</h2>
            <p>Tuyển tập các bài thơ hay của tác giả Kim Bồng Miêu</p>
          </Jumbotron>
          {/* Showing index in computer browser */}
          <Row>
            <Col xsHidden md={4}>{ThoIndex}</Col>
            <Col xs={12} md={8} className='text-center'>{ThoList[this.state.random]}</Col>
            <Col xs={12} md={8} mdOffset={4}>
              <ButtonToolbar className='text-center'>
                <Button bsStyle='default'>Trước</Button>
                <Button bsStyle='success'>Mục lục</Button>
                <Button bsStyle='primary' onClick={this.getRandom}>Random</Button>
                <Button bsStyle='default'>Sau</Button>
              </ButtonToolbar>
            </Col>
          </Row>
          {/* Show a random tho */}
          {/* Button group: Truoc, Index, Random, Sau */}
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
