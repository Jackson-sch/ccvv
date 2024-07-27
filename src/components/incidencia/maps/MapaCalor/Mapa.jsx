"use client";
import React, { useEffect, useState } from "react";
import {
  Map,
  APIProvider,
} from "@vis.gl/react-google-maps";
import HeatMap from "./HeatMap";
import Loading from "./loading";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Mapa({ data, center, zoom, mapContainerStyle }) {
  const dataGeojson = data.map(({ latitud, longitud }) => ({
    latitud: parseFloat(latitud),
    longitud: parseFloat(longitud),
  }));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div style={mapContainerStyle}>
      <APIProvider apiKey={API_KEY}>
        <Map
          gestureHandling="greedy"
          defaultCenter={center}
          defaultZoom={zoom}
          minZoom={15}
          zoomControl={true}
          style={mapContainerStyle}
          options={{
            disableDefaultUI: true,
            mapId: "6db90ff1b783dd57",
          }}
        >
          {dataGeojson && (
            <HeatMap geojson={dataGeojson} radius={20} opacity={0.8} />
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
