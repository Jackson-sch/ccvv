import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import { set } from "mongoose";
import InfoCamara from "./InfoCamara";

export default function MarkerInfo({ markers }) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
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
          <Pin background="#48e" borderColor="#44e" scale={1.4}>
            <span className="text-base font-bold">{item.numeroCamara}</span>
          </Pin>
        </AdvancedMarker>
      ))}

      {selectedMarker && (
        <InfoWindow
          anchor={marker.current}
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
