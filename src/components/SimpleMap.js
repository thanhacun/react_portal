import React, { Component } from 'react';
import { compose } from 'recompose';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
//import Auth from '../utils/Auth';
//import { getUserInfo } from '../actions/userActions';

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom = {8}
    defaultCenter = {{ lat: -34.397, lng: 150.644 }}
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
);

class SimpleMap extends Component {

  render(){
    return (
      <div className="container">
        <h1>Map here</h1>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD31s55OU_G5jv08zTlkykNVvCQPfMKQ3U"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
    </div>
    );
  }
};

//NOTE: withRouter read react-router training
export default withRouter(connect()(SimpleMap));
