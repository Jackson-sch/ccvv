"use client";
import React, { useEffect, useRef } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import HeatMap from "./HeatMap";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


const mapContainerStyle = { width: "100%", height: "80vh" };

export default function Mapa({ data, center, zoom }) {
  const dataGeojson = data.map(({ latitud, longitud }) => ({
    latitud: parseFloat(latitud),
    longitud: parseFloat(longitud),
  }));

  return (
    <div style={mapContainerStyle}>
      <APIProvider apiKey={API_KEY}>
        <Map
          gestureHandling="greedy"
          defaultCenter={center}
          defaultZoom={zoom}
          style={mapContainerStyle}
          options={{ disableDefaultUI: true, mapId: "6db90ff1b783dd57" }}
        >
          {dataGeojson && (
            <HeatMap geojson={dataGeojson} radius={20} opacity={0.6} />
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
