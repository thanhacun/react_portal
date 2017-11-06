import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';

import jumbo_01 from './jumbo_bg_01.png';
import { getTho } from '../../actions/tcctActions';
import ThoIndex from './ThoIndex';

import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

class ThoDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {selectedID: 0};
  }

  componentDidMount(){
    this.props.getTho();
  }

  render(){
    const jumboStyle = {
      backgroundImage: `url(${jumbo_01})`
    };

    const Jumbo = (props) => {
      return (
          <Jumbotron className="text-center" {...props}>
            <h2>TCCT - Thơ Kim Bồng Miêu</h2>
            <p>Tuyển tập các bài thơ hay của tác giả Kim Bồng Miêu</p>
          </Jumbotron>
      )
    }

    if (this.props.busy) {
      return (
        // TODO better way to handle busy
        <div className="container">
          <Jumbo style={jumboStyle} />
          <i className="text-center text-success fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
      )
    } else {
      // NOTE: why thos[rndNumber].title is not available here
      const thoLength = this.props.tho.length;
      const { selectedID } = this.state;
      const { tho } = this.props;
      const thoStyle = {
        container: {
          border: 'solid 1px',
          borderColor: 'lightgrey'
        },
        content: {
          padding: '5px'
        }
      }

      const ThoList = tho.map((tho) => {
        return (
          <div key={`list_${tho.index}`} style={thoStyle.container}>
            <div style={thoStyle.content}>
              {renderHTML(tho.content)}
            </div>
          </div>
        )
      });

      return (
        <div className="container">
          <Jumbo style={jumboStyle} />
          <Grid>
            <Row className="show-grid">
              <Col xsHidden smHidden md={4} mdOffset={2}>
                <ThoIndex
                  tho={this.props.tho} selectedID={this.state.selectedID}
                  indexOnClick={ id => this.setState({selectedID: id}) }
                  getRandom = { randomID => this.setState({selectedID: randomID}) }
                  handleNavigation = { navigatedId => this.setState({selectedID: navigatedId}) }
                />
                {/* <Toolbar /> */}
              </Col>
              <Col sm={12} md={4}>
                {/* TODO: use HOC */}
                {ThoList[this.state.selectedID]}
              </Col>
            </Row>
          </Grid>
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
