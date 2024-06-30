"use client";
import React from "react";
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import { Avatar } from "@nextui-org/react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapsComponent({
  item,
  center,
  zoom,
  mapContainerStyle = { width: "100%", height: "20vh" },
}) {
  return (
    <div style={mapContainerStyle}>
      <APIProvider apiKey={API_KEY}>
        <Map
          mapContainerStyle={mapContainerStyle}
          defaultZoom={zoom}
          defaultCenter={center}
          gestureHandling="greedy"
          options={{ 
            disableDefaultUI: true, 
            mapId: "6db90ff1b783dd57",
            zoomControl: false,
            minZoom: zoom,
            maxZoom: zoom,
          }}
        >
          {/* Agrega un marcador con los datos que trae center */}
          <AdvancedMarker position={center} >
            <Pin background="#ff0035" borderColor="#ff0035" scale={2.5}>
              {/* <span className="text-base font-bold">CN</span> */}
              <Avatar text="CN" src={item.imageUrl} size="lg" />
            </Pin>
          </AdvancedMarker>

        </Map>
      </APIProvider>
    </div>
  );
}