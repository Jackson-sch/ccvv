import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

export default function UseDrawingManager({ onShapeComplete }) {
  const map = useMap();
  const drawing = useMapsLibrary("drawing");
  const drawingManagerRef = useRef(null);

  useEffect(() => {
    if (!map || !drawing) return;

    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: google.maps.drawing.OverlayType.CIRCLE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
      markerOptions: {
        draggable: true,
      },
      circleOptions: {
        clickable: true,
        editable: true,
        zIndex: 1,
      },
      polygonOptions: {
        clickable: true,
        draggable: true,
        editable: true,
      },
      polylineOptions: {
        clickable: true,
        draggable: true,
        editable: true,
      },
      rectangleOptions: {
        clickable: true,
        draggable: true,
        editable: true,
      },
    });

    newDrawingManager.setMap(map);
    drawingManagerRef.current = newDrawingManager;

    google.maps.event.addListener(
      newDrawingManager,
      "overlaycomplete",
      (event) => {
        onShapeComplete(event);
      }
    );

    return () => {
      if (drawingManagerRef.current) {
        drawingManagerRef.current.setMap(null);
      }
    };
  }, [map, drawing, onShapeComplete]);

  return drawingManagerRef
}
