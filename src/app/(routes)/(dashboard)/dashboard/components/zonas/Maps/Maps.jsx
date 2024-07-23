"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  DrawingManager,
} from "@vis.gl/react-google-maps";
import {CustomZoomControl} from "./CustomControl"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const center = {
  lat: -8.0843273,
  lng: -78.9990145,
};

const mapContainerStyle = { width: "100%", height: "80vh" };

export default function Maps() {
  const [zoom, setZoom] = useState(15);
  const [controlPosition, setControlPosition] = useState(ControlPosition.TOP_LEFT);


  return (
    <div style={mapContainerStyle}>
      <APIProvider apiKey={API_KEY}>
        <Map
          gestureHandling="greedy"
          defaultCenter={center}
          zoom={zoom}
          style={mapContainerStyle}
          onZoomChanged={ev => setZoom(ev.detail.zoom)}
        >
          <MapControl position={ControlPosition.TOP_LEFT}>
          <div
            style={{
              background: 'white',
              padding: '1em'
            }}>
            Zoom: {zoom.toFixed(2)}
          </div>
        </MapControl>
        <CustomZoomControl
          controlPosition={controlPosition}
          zoom={zoom}
          onZoomChange={zoom => setZoom(zoom)}
        />
        </Map>
      </APIProvider>
    </div>
  );
}
