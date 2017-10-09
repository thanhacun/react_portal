import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Welcome extends Component {
  render(){
    return (
      <div className="container">
        <Jumbotron className="text-success">
          <h2>React Apps</h2>
          <p>combining React, Redux and Router to make React apps</p>
        </Jumbotron>
      </div>
    )
  }
}

export default Welcome;
