'use client'
import { AdvancedMarker, APIProvider, ControlPosition, Map, MapControl, Pin } from "@vis.gl/react-google-maps";
import ControlPanel from "./Drawing/ControlPanel";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const center = {
    lat: -8.0843273,
    lng: -78.9990145
  };

export default function Maps({mapContainerStyle = { width: "100%", height: "30vh" },}) {
  return (
    <div style={mapContainerStyle}>
        <APIProvider apiKey={API_KEY}>
            <Map gestureHandling="greedy" defaultCenter={center} defaultZoom={15} mapContainerStyle={mapContainerStyle} />
                
            <MapControl position={ControlPosition.TOP_CENTER}   />
            
        </APIProvider>
    </div>
  )
}
