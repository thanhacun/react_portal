import React, { Component } from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, StreetViewPanorama, OverlayView } from 'react-google-maps';

const StreetViewPanoramaWithOverlayView = withScriptjs(withGoogleMap((props) =>
  <GoogleMap defaultZoom={8} defaultCenter={props.center}>
    <StreetViewPanorama defaultPosition={props.center} visible>
      <OverlayView position={{lat: 21.030849, lng: 105.7841423}}>
        <div>KINDEN VIETNAM HO</div>
      </OverlayView>
    </StreetViewPanorama>
  </GoogleMap>
));
