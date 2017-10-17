import React from 'react';
import { connect } from 'react-redux';

import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap,
  GoogleMap, Marker, InfoWindow, StreetViewPanorama } from 'react-google-maps';
import { markerMouseOver, markerClick, markerMouseOut } from '../actions/mapActions';

import '../css/Map.css';

const ProjectsMap = compose(
  withProps((props) => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&
    libraries=geometry,drawing,places&key=AIzaSyD31s55OU_G5jv08zTlkykNVvCQPfMKQ3U`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map_container container" style={{ height: props.containerElement }} />,
    mapElement: <div className="map_element" style={{ height: props.mapHeight }} />,
    vnCenter: {lat: 16.0472484, lng: 108.1716866}
  })),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap defaultZoom={6} defaultCenter={props.vnCenter} zoom={props.zoom} center={props.center}>
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
          <StreetViewPanorama
            position={{ lat: marker.lat, lng: marker.lng}}
            visible={ props.zoom > 10 }
            pov={marker.pov ? {heading: marker.pov.heading, pitch:marker.pov.pitch} : {heading: 0, pitch: 0}}
          >
            <InfoWindow>
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
          </StreetViewPanorama>
        )}
        {/* {marker.showStreet && (
          <StreetViewPanorama defaultPosition={{lat:marker.lat, lng:marker.lng}} visible>

          </StreetViewPanorama>
        )} */}
      </Marker>
    ))}
  </GoogleMap>
)

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
