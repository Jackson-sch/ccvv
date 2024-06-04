"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import InfoCamara from "./InfoCamara";
import Drawer from "../Drawer";
import Formulario from "../ubicacion/Formulario";

const containerStyle = {
  width: "100%",
  height: "75vh",
};

const center = {
  lat: -8.0798797,
  lng: -79.0027169,
};

const formInitialData = {
  nombreCamara: "",
  numeroCamara: "",
  status: "",
  direccion: "",
  latitud: "",
  longitud: "",
};



export default function MapComponent({ markers, onSubmit }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Muestra el Drawer
  const [formData, setFormData] = useState(formInitialData);

  const handleMarkerClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const direccion = await getGeoCode({ lat, lng });
    setNewMarker({ lat, lng });
    setFormData({ ...formData, latitud: lat, longitud: lng, direccion });
    setIsOpen(true);
  }

  const getGeoCode = async ({ lat, lng }) => {
    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results[0]) {
      return response.results[0].formatted_address;
    } else {
      return "No se pudo encontrar la ubicación";
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFormSubmit = () => {
    onSubmit(formData);
    setFormData(formInitialData);
    setIsOpen(false);
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
      language="es"
      region="PE"
      mapIds={["6db90ff1b783dd57"]}
    >
      <GoogleMap 
      mapContainerStyle={containerStyle} 
      center={center} 
      zoom={16}
      onClick={handleMarkerClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker._id}
            title={marker.nombreCamara}
            label={{
              text: marker.numeroCamara.toString(),
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            position={{
              lat: parseFloat(marker.latitud),
              lng: parseFloat(marker.longitud),
            }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedMarker.latitud),
              lng: parseFloat(selectedMarker.longitud),
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
            options={{
              pixelOffset: new window.google.maps.Size(0, -30),
            }}
          >
            <InfoCamara marker={selectedMarker} />
          </InfoWindow>
        )}

        {newMarker && (
          <Marker
            position={newMarker}
          />
        )}
      </GoogleMap>
      <Drawer title="Nueva ubicación" isOpen={isOpen} setIsOpen={setIsOpen} >
        <Formulario formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
      </Drawer>
    </LoadScript>
  );
}
