export function markerClick(targetMarker, currentZoom){
  return {
    type: "MARKER_CLICK",
    payload: {targetMarker, currentZoom}
  }
};

export function markerMouseOver(targetMarker){
  return {
    type: "MARKER_MOUSE_OVER",
    payload: targetMarker
  }
};

export function markerMouseOut(targetMarker){
  return {
    type: "MARKER_MOUSE_OUT",
    payload: targetMarker
  }
}
