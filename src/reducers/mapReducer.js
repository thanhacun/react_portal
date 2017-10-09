import markers from '../data/locations.json';

export const mapInitialState = {
  containerHeight: '800px',
  mapHeight:'750px',
  defaultCenter: {lat: 16.0472484, lng: 108.1716866},
  center: {lat: 16.0472484, lng: 108.1716866},
  markers,
  zoom: 6
}

export default function mapReducer(state=mapInitialState, action, userData) {
  switch (action.type) {
    case "MARKER_CLICK":
      if (action.payload.currentZoom < 10) {
        return {
          ...state,
          zoom: 15,
          center: {lat: action.payload.targetMarker.lat, lng:action.payload.targetMarker.lng}
        };
      }
      return {
        ...state,
        zoom: 6,
        center: state.defaultCenter
      }

    case "MARKER_MOUSE_OVER":
      return {
        ...state,
        markers: state.markers.map((marker) => {
          if (marker === action.payload) {
            return {
              ...marker,
              showInfo: true
            };
          }
          return marker;
        })
      };

    case "MARKER_MOUSE_OUT":
    return {
      ...state,
      markers: state.markers.map((marker) => {
        if (marker === action.payload) {
          return {
            ...marker,
            showInfo: false
          };
        }
        return marker;
      })
    }

    default:
      return {...state, user: userData};
  }
}
