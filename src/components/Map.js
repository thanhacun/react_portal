import React from 'react';
import { connect } from 'react-redux';

import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap,
  GoogleMap, Marker, InfoWindow, StreetViewPanorama } from 'react-google-maps';
import { markerMouseOver, markerClick, onInfoWindowCloseClick } from '../actions/mapActions';

import '../css/Map.css';
//TODO: use compose to handle some UI state:

const ProjectsMap = compose(
  withProps((props) => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&
    libraries=geometry,drawing,places&key=AIzaSyD31s55OU_G5jv08zTlkykNVvCQPfMKQ3U`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map_container container" style={{ height: props.containerElement }} />,
    mapElement: <div className="map_element" style={{ height: props.mapHeight }} />,
    vnCenter: {lat: 16.0472484, lng: 108.1716866},
    targetMarker: props.markers[props.showInfoIndex]
  })),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={6} defaultCenter={props.vnCenter}
    zoom={props.zoom} center={props.center}>
    <StreetViewPanorama
      visible={ props.showStreet.visible}
      position={ props.center }
      pov={ props.showStreet.pov ? props.showStreet.pov : {heading: 0, pitch: 0} }
    >
    </StreetViewPanorama>
      {props.markers.map((marker, index) => (
        <Marker
          position={{lat:marker.lat, lng:marker.lng}}
          key={index}
          title={marker.title}
          onMouseOver={props.showInfoIndex === index ? null : () => props.onMarkerMouseOver(index)}
          //onMouseOver={() => props.onMarkerMouseOver(index)}
          onClick={() => props.onMarkerClick(index, props.zoom)}
        >
          {(props.showInfoIndex === index) && (
              <InfoWindow
                onCloseClick={props.onInfoWindowCloseClick}
              >
                <div className="infowindow">
                  <h3>{marker.title}</h3>
                  {marker.address ?
                    <address className="infowindow_address">
                      {marker.address.street1} {marker.address.street2 ? (', ' + marker.address.street2 ): ''} <br />
                      {marker.address.city}<br />
                      {marker.address.country}<br />
                      Tel.: {marker.address.tel}<br />
                      <a href={marker.address.website}>Find more information</a>
                    </address>
                     : ""}
                </div>
              </InfoWindow>
          )}
        </Marker>
      ))}
      {/* {(props.showInfoIndex !== -1) &&
        <InfoWindow
          position={{ lat: props.targetMarker.lat, lng: props.targetMarker.lng }}
          onCloseClick={props.onInfoWindowCloseClick}
        >
          <div className="infowindow">
            <h3>{props.targetMarker.title}</h3>
            {props.targetMarker.address ?
              <address className="infowindow_address">
                {props.targetMarker.address.street1} {props.targetMarker.address.street2 ? (', ' + props.targetMarker.address.street2 ): ''} <br />
                {props.targetMarker.address.city}<br />
                {props.targetMarker.address.country}<br />
                Tel.: {props.targetMarker.address.tel}<br />
                <a href={props.targetMarker.address.website}>Find more information</a>
              </address>
               : ""}
          </div>
        </InfoWindow>
      } */}
  </GoogleMap>
)

const mapStateToProps = store => store.map;

const mapDispatchToProps = dispatch => {
  return {
    onMarkerMouseOver: (markerIndex) => dispatch(markerMouseOver(markerIndex)),
    onMarkerClick:(markerIndex, currentZoom) => dispatch(markerClick(markerIndex, currentZoom)),
    onInfoWindowCloseClick: () => dispatch(onInfoWindowCloseClick()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsMap);
