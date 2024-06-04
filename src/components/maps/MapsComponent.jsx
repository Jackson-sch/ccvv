import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import InfoCamara from "./InfoCamara";

export default function MapsComponent({
  markers = [],
  center = { lat: -8.0798797, lng: -79.0027169 },
  zoom,
  mapContainerStyle = { width: "100%", height: "90vh" },
  selectedMarker,
  setSelectedMarker,
  newMarker,
  setNewMarker,
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  children,
}) {

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

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
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
        {children}
      </GoogleMap>
    </LoadScript>
  );
}
