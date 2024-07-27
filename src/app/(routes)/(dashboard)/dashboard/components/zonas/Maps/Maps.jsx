"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import DrawingTool from "./DrawingTool";
import { fitBoundsAndRestrict } from "@/utils/mapUtils";
import ZonasOverlay from "./ZonasOverlay";
import LeyendaZonas from "./LeyendaZonas";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const center = {
  lat: -8.074602502066698,
  lng: -78.99854554604522,
};

const mapContainerStyle = { width: "100%", height: "80vh" };

export default function Maps({ onShapeComplete, bounds, zonas }) {
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      fitBoundsAndRestrict(mapRef.current, bounds);
    }
  }, [mapRef.current, bounds]);

  return (
    <div style={mapContainerStyle}>
      <APIProvider apiKey={API_KEY}>
        <Map
          gestureHandling="greedy"
          defaultCenter={center}
          zoom={zoom}
          minZoom={15}
          style={mapContainerStyle}
          onZoomChanged={(ev) => setZoom(ev.detail.zoom)}
        >
          <ZonasOverlay zonas={zonas} />
          
        </Map>
        <MapControl position={ControlPosition.TOP_CENTER}>
          <DrawingTool onShapeComplete={onShapeComplete} />
        </MapControl>
        <LeyendaZonas zonas={zonas} />
      </APIProvider>
    </div>
  );
}
