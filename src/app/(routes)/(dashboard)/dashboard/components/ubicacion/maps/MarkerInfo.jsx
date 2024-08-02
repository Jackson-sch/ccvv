import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import InfoCamara from "./InfoCamara";


export default function MarkerInfo({ markers }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <>
      {markers.map((item) => (
        <AdvancedMarker
          ref={markerRef}
          onClick={() => setSelectedMarker(item)}
          key={item._id}
          position={{
            lat: parseFloat(item.latitud),
            lng: parseFloat(item.longitud),
          }}
          title={item.nombreCamara}
          label={{
            text: item.numeroCamara.toString(),
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          <Pin
            background={item.nombreCamara === "CN" ? "#ff0035" : "#48e"}
            borderColor={item.nombreCamara === "CN" ? "#ff0035" : "#48e"}
            scale={1.4}
          >
            <span className="text-base font-bold">{item.numeroCamara}</span>
          </Pin>
        </AdvancedMarker>
      ))}

      {selectedMarker && (
        <InfoWindow
          maxWidth={300}
          position={{
            lat: parseFloat(selectedMarker.latitud),
            lng: parseFloat(selectedMarker.longitud),
          }}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
          options={{
            pixelOffset: new window.google.maps.Size(0, -45),
          }}
        >
          <InfoCamara marker={selectedMarker} />
        </InfoWindow>
      )}
    </>
  );
}
