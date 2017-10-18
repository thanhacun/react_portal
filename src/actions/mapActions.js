export function markerClick(markerIndex, currentZoom){
  return {
    type: "MARKER_CLICK",
    payload: {markerIndex, currentZoom}
  }
};

export function markerMouseOver(markerIndex){
  return {
    type: "MARKER_MOUSE_OVER",
    payload: {markerIndex}
  }
};
