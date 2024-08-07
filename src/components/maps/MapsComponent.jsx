"use client";
import React, { useState, useEffect } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./MapControl/MapControl";
import MarkerInfo from "../incidencia/maps/MapaDetalles/MarkerInfo";
import MapHandler from "./MapControl/MapHandler";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapsComponent({
  markers = [],
  center = { lat: -8.074602502066698, lng: -78.99854554604522 },
  zoom,
  mapContainerStyle = { width: "100%", height: "90vh" },
  setNewMarker,
  setIsOpen,
  formData,
  setFormData,
  children,
  fecha,
  hora,
  name,
}) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Esto asegura que el código sólo se ejecuta en el cliente
    setIsClient(true);
  }, []);

  const handleMarkerClick = async (e) => {
    if (!isClient) return; // Previene la ejecución en el servidor

    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    const direccion = await getGeoCode({ lat, lng });
    setNewMarker({ lat, lng });
    setFormData({
      ...formData,
      latitud: lat,
      longitud: lng,
      direccion,
      fecha: fecha,
      hora: hora,
      nombres_apellidos: name,
    });
    setIsOpen(true);
  };

  const getGeoCode = async ({ lat, lng }) => {
    if (!isClient || !window.google) return; // Previene la ejecución en el servidor

    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results[0]) {
      return response.results[0].formatted_address;
    } else {
      return "No se pudo encontrar la ubicación";
    }
  };

  return (
    <div style={mapContainerStyle}>
      {isClient && (
        <APIProvider apiKey={API_KEY}>
          <Map
            mapContainerStyle={mapContainerStyle}
            defaultZoom={zoom}
            minZoom={15}
            defaultCenter={center}
            gestureHandling="greedy"
            options={{ disableDefaultUI: true, mapId: "6db90ff1b783dd57" }}
            onClick={handleMarkerClick}
          >
            <MarkerInfo markers={markers} />
            {children}
            <AdvancedMarker ref={markerRef} position={null}>
              <Pin
                background={"#eee82f"}
                glyphColor={"#3f2909"}
                borderColor={"#3f2909"}
                scale={1.5}
              />
            </AdvancedMarker>
          </Map>

          <CustomMapControl onPlaceSelect={setSelectedPlace} />

          <MapHandler place={selectedPlace} marker={marker} />
        </APIProvider>
      )}
    </div>
  );
}
