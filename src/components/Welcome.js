import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Welcome extends Component {
  render(){
    return (
      <div className="container">
        <Jumbotron className="text-success">
          <h2>Fullstack Webapp - SPA - PWA</h2>
          <p>Using: Nodejs, React, Redux, Webpack...</p>
        </Jumbotron>
      </div>
    )
  }
}

export default Welcome;
