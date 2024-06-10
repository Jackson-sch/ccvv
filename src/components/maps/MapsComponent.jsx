"use client";
import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MarkerInfo from "./MarkerInfo";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapsComponent({
  markers = [],
  center = { lat: -8.0798797, lng: -79.0027169 },
  zoom,
  mapContainerStyle = { width: "100%", height: "90vh" },
  newMarker,
  setNewMarker,
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  children,
  fecha,
  hora,
}) {
  const handleMarkerClick = async (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    const direccion = await getGeoCode({ lat, lng });
    setNewMarker({ lat, lng });
    setFormData({ ...formData, latitud: lat, longitud: lng, direccion, fecha: fecha, hora: hora});
    setIsOpen(true);
  };

  const getGeoCode = async ({ lat, lng }) => {
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
      <APIProvider apiKey={API_KEY}>
        <Map
          mapContainerStyle={mapContainerStyle}
          defaultZoom={zoom}
          defaultCenter={center}
          gestureHandling="greedy"
          options={{ disableDefaultUI: true, mapId: "6db90ff1b783dd57" }}
          onClick={handleMarkerClick}
        >
          <MarkerInfo markers={markers} />
          {children}
        </Map>
      </APIProvider>
    </div>
  );
}
