/*global google*/
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap,
  // eslint-disable-next-line
  DirectionsRenderer, StreetViewPanorama, Marker, InfoWindow } from 'react-google-maps';

// ====================
// DIRECTIONS =========
// ====================
// eslint-disable-next-line
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD31s55OU_G5jv08zTlkykNVvCQPfMKQ3U",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="container" style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.markers[3].lat, this.props.markers[3].lng),
        destination: new google.maps.LatLng(this.props.markers[0].lat, this.props.markers[0].lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching direction ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter= { new google.maps.LatLng(props.markers[0].lat, props.markers[0].lng)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)
// ====================
// STREETVIEW =========
// ====================
// eslint-disable-next-line
const StreetViewPanoramaWithOverlayView = compose(
  withProps((props) => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&
    libraries=geometry,drawing,places&key=AIzaSyD31s55OU_G5jv08zTlkykNVvCQPfMKQ3U`,
    loadingElement: <div style={{ height: `100%`}} />,
    containerElement: <div className="container" style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    //center: { lat: props.markers[0].lat, lng: props.markers[0].lng }
    ho: props.markers[0],
  })),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: props.ho.lat, lng: props.ho.lng}}
    >
      <StreetViewPanorama
        //defaultPosition={{lat: props.ho.lat, lng: props.ho.lng}}
        position={{ lat: props.ho.lat, lng: props.ho.lng }}
        visible
        pov={{ heading: props.ho.pov.heading, pitch: props.ho.pov.pitch}}
      >
        {/* <OverlayView
          position={{ lat: props.markers[0].lat, lng: props.markers[0].lng }}
            mapPaneName={OverlayView.OVERLAY_LAYER}
            getPixelPositionOffset={getPixelPositionOffset}
        >
          <div style={{ background: `green`, color: `white`, padding: 5, borderRadius: `50%` }}>
            KINDEN VIETNAM
          </div>
        </OverlayView> */}
      </StreetViewPanorama>
      <Marker
        position={{lat: props.ho.lat , lng: props.ho.lng}}
        title={props.markers[0].title}
      >
        {/* <InfoWindow>
          <div>
            <h3>{props.ho.title}</h3>
          </div>
        </InfoWindow> */}
      </Marker>
  </GoogleMap>
)

const mapStateToProps = store => store.map;

//NOTE: withRouter read react-router training
export default withRouter(connect(mapStateToProps, null)(MapWithADirectionsRenderer));
//export default withRouter(connect(mapStateToProps, null)(StreetViewPanoramaWithOverlayView));
