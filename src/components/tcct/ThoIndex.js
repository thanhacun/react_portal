import React, { Component } from 'react';
/*=== ALGOLIA InstantSearch ===*/
import { InstantSearch, Hits, SearchBox, Highlight, RefinementList,
Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom';
import { connectSearchBox, connectHits } from 'react-instantsearch/connectors'
//import 'react-instantsearch-theme-algolia/style.min.css'
/*=== ALGOLIA InstantSearch ===*/
import { ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


//[ ] TODO: handling pages
//[X] TODO: sortting tho
//[X] TODO: handling buttons group here
class ThoSearch extends Component {
  render(){
    const CustomizedHits = ({hits}) => (
      <ListGroup>
        {hits.map(hit => (
          <ListGroupItem key={hit.objectID} onClick={(e) => console.log(e.target)}>
            {`${hit.index}. `}<Highlight attributeName="title" hit={hit} />
          </ListGroupItem>
        ))}
      </ListGroup>
    );
    const ConnectedHits = connectHits(CustomizedHits);
    const CustomizedSearchBox = ({currentRefinment, refine}) => (
      <input type="text" value={currentRefinment}
        onChange={(e) => refine(e.target.value)} />
    );
    const ConnectedSearchBox = connectSearchBox(CustomizedSearchBox);
    const Tho = ({hit}) => (
      <div style={{marginTop: '10px'}}>
        <span className="hit-name">
          {`${hit.index}. `}<Highlight attributeName="title" hit={hit} />
        </span>
      </div>
    );
    const Search = () => (
      <div className="container">
        {/* <CurrentRefinements/> */}
        {/* <ClearAll /> */}
        {/* <SearchBox /> */}
        <ConnectedSearchBox />
        {/* <RefinementList attributeName="category" /> */}
        {/* <Hits hitComponent={Tho}/> */}
        <ConnectedHits />
        <Pagination />
      </div>
    )
    return (
      <InstantSearch
        appId="4VFRX3XOJ8"
        apiKey="b2e1639c8e855fd8e75aca9bf8b0f051"
        indexName="dev_THO"
      >
      <Search />
      </InstantSearch>
    )
  }
}

class ThoIndex extends Component {
  constructor(props){
    super(props);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.getRandom = this.getRandom.bind(this);
  }

  handleOnClick(id){
    this.props.indexOnClick(id);
  }

  getRandom(){
    //[X] TODO: avoid random same ID as current ID
    while (true){
      const randomID = Math.round(Math.random() * (this.props.tho.length - 1));
      if (randomID !== this.props.selectedID){
        this.props.getRandom(randomID);
        break;
      }
    }
  }

  handleNavigation(actionType, selectedID){
    this.props.handleNavigation(selectedID + (actionType === 'next' ? 1 : -1))
  }

  render(){
    const { selectedID } = this.props;
    const thoLength = this.props.tho.length;
    const sortedTho = this.props.tho.sort((tho1, tho2) => tho1.index > tho2.index);
    const activeStyle = {
      fontWeight: 'bold'
    }
    const IndexList = sortedTho.map((tho, id) => {
      return (
        <ListGroupItem key={`thoindex_${id}`}
          disabled={selectedID === id ? true : false}
          style={selectedID === id ? activeStyle: {}}
          onClick={() => this.handleOnClick(id)} >{`${tho.index}. ${tho.title}`}
        </ListGroupItem>
      );
    });

    const Toolbar = () => (
      <ButtonGroup>
        <Button bsStyle='default' disabled={(selectedID === 0) ? true : false}
          onClick={() => this.handleNavigation('previous', selectedID)}><FontAwesome name="chevron-circle-left" /></Button>
        <Button bsStyle='default' disabled><FontAwesome name="pencil-square-o" /></Button>
        <Button bsStyle='default' onClick={this.getRandom}><FontAwesome name="random" /></Button>
        <Button bsStyle='default' disabled={(selectedID === thoLength - 1) ? true : false}
            onClick={() => this.handleNavigation('next', selectedID)}><FontAwesome name="chevron-circle-right" /></Button>
      </ButtonGroup>
    );

    return (
      <div>
        <ListGroup>{IndexList}</ListGroup>
        <Toolbar />
        <ThoSearch />
      </div>
    );
  }
}

export default ThoIndex;
