import markers from '../data/locations.json';

export const mapInitialState = {
  containerHeight: '800px',
  mapHeight:'750px',
  defaultCenter: {lat: 16.0472484, lng: 108.1716866},
  center: {lat: 16.0472484, lng: 108.1716866},
  markers,
  showInfoIndex: -1,
  zoom: 6,
  showStreet: {
    visible: false,
  },
}

export default function mapReducer(state=mapInitialState, action, userData) {
  const { type, payload } = action ;
  switch (type) {
    case "MARKER_CLICK":
      if (payload.currentZoom < 10) {
        return {
          ...state,
          zoom: 15,
          center: { lat: state.markers[payload.markerIndex].lat,
                    lng: state.markers[payload.markerIndex].lng},
          showStreet: state.markers[payload.markerIndex].pov
            ? {visible: true, pov: {...state.markers[payload.markerIndex].pov}}
            : {visible: false}
        };
      }
      return {
        ...state,
        zoom: 6,
        center: state.defaultCenter,
        showStreet: {visible: false}
      }

    case "MARKER_MOUSE_OVER":
      return {
        ...state,
        showInfoIndex: payload.markerIndex,
      };

    case "INFOWINDOW_CLOSE_CLICK":
      return {
        ...state,
        showInfoIndex: -1
      }

    default:
      return {...state, user: userData};
  }
}
