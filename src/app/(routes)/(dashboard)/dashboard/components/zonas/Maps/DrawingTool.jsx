import React, { useEffect, useMemo, useRef } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const DrawingTool = ({ onShapeComplete }) => {
  const map = useMap();
  const drawing = useMapsLibrary('drawing');
  const drawingManagerRef = useRef(null);

  useEffect(() => {
    if (!drawing || !map) return;

    const drawingManager = new google.maps.drawing.DrawingManager({
      /* drawingMode: google.maps.drawing.OverlayType.POLYGON, */
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          /* google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE, */
          google.maps.drawing.OverlayType.POLYGON,
          /* google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE, */
        ],
      },
      polygonOptions: {
        fillColor: '#48E',
        fillOpacity: 0.2,
        strokeWeight: 2,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
    });

    drawingManager.setMap(map);
    drawingManagerRef.current = drawingManager;

    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      onShapeComplete(event);
    });

    return () => {
      if (drawingManagerRef.current) {
        drawingManagerRef.current.setMap(null);
      }
    };
  }, [drawing, map, onShapeComplete]);

  return null;
};

export default DrawingTool;
