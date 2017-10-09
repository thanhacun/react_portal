import React, { Component } from 'react';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { markerMouseOver, markerClick, markerMouseOut } from '../actions/mapActions';

import '../css/Map.css';
const vnCenter = {lat: 16.0472484, lng: 108.1716866};

const GoogleMapLoader = compose(
  withScriptjs,
  withGoogleMap)(props => (
  <GoogleMap defaultZoom={6} defaultCenter={vnCenter} zoom={props.zoom} center={props.center}>
      {props.markers.map((marker, index) => (
        <Marker
          position={{lat:marker.lat, lng:marker.lng}}
          key={index}
          title={marker.title}
          onMouseOver={() => props.onMarkerMouseOver(marker)}
          onClick={() => props.onMarkerClick(marker, props.zoom)}
          onMouseOut={() => props.onMarkerMouseOut(marker)}
        >
          {marker.showInfo && (
            <InfoWindow>
              <span className="infowindow">{marker.title}</span>
            </InfoWindow>
          )}
        </Marker>
      ))}
  </GoogleMap>
));

class ProjectsMap extends Component {
  render(){
    return (
      <div className="container">
        <h1 className="text-success">Projects Map of Vietnam</h1>
        {!this.props.user.userEmail ?
          <h2 className="text-alert">Please login!</h2>
           :
           <GoogleMapLoader
             googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD31s55OU_G5jv08zTlkykNVvCQPfMKQ3U"
             loadingElement={<div style={{ height: `100%` }} />}
             containerElement={
               <div className="map_container" style={{ height: this.props.containerElement }} />
             }
             mapElement={
               <div className="map_element" style={{ height: this.props.mapHeight }} />
             }
             zoom={this.props.zoom}
             center={this.props.center}
             markers={this.props.markers}
             onMarkerMouseOver={this.props.onMarkerMouseOver}
             onMarkerMouseOut={this.props.onMarkerMouseOut}
             onMarkerClick={this.props.onMarkerClick}
           />
        }
      </div>

    );
  }
};

//connect to store to return state
const mapStateToProps = store => store.map;

const mapDispatchToProps = dispatch => {
  return {
    onMarkerMouseOver: (targetMarker) => dispatch(markerMouseOver(targetMarker)),
    onMarkerClick:(targetMarker, currentZoom) => dispatch(markerClick(targetMarker, currentZoom)),
    onMarkerMouseOut:(targetMarker) => dispatch(markerMouseOut(targetMarker)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsMap);
