import reducer from './index';
import markers from '../data/locations.json';

const mapInitialState = {
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

it('zoom the map if click', () => {
  const markerIndex = 0;
  const currentZoom = 8;
  const action = {type: 'MARKER_CLICK', payload: {markerIndex, currentZoom}};
  const nextState =  reducer(mapInitialState, action);
  expect(nextState.map).toEqual(expect.objectContaining({
      zoom: 15
  }));
});
