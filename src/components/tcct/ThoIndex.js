import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

//[] TODO: handling pages
class ThoIndex extends Component {
  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(id, index){
    this.props.indexOnClick(id);
  }

  render(){
    const IndexList = this.props.tho.map((tho, id) => {
      return (
        <ListGroupItem key={`thoindex_${tho.index}`} active={(this.props.selectedID) === id ? true : false}
          onClick={() => this.handleOnClick(id)} >{`${tho.index}. ${tho.title}`}</ListGroupItem>
      );
    });

    return (
      <ListGroup>
        {IndexList}
      </ListGroup>
    )
  }
}

export default ThoIndex;
