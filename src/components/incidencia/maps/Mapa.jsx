"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AdvancedMarker,
  Map,
  Pin,
  APIProvider,
} from "@vis.gl/react-google-maps";
import {
  PlaceReviews,
  PlaceDataProvider,
  PlaceDirectionsButton,
  IconButton,
  PlaceOverview,
  SplitLayout,
  OverlayLayout,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import HeatMap from "./HeatMap";
import Loading from "./loading";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Mapa({ data, center, zoom, mapContainerStyle }) {
  const dataGeojson = data.map(({ latitud, longitud }) => ({
    latitud: parseFloat(latitud),
    longitud: parseFloat(longitud),
  }));

  const [isLoading, setIsLoading] = useState(true);
  const overlayLayoutRef = useRef(null);
  const pickerRef = useRef(null);
  const [college, setCollege] = useState(undefined);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div style={mapContainerStyle}>
      <APIProvider apiKey={API_KEY}>
        <SplitLayout rowReverse rowLayoutMinWidth={800}>
          <div className="h-full" slot="fixed">
            <OverlayLayout ref={overlayLayoutRef}>
              <div className="SlotDiv" slot="main">
                <PlacePicker
                  className="CollegePicker"
                  ref={pickerRef}
                  forMap="gmap"
                  country={["pe"]}
                  
                  placeholder="Enter a college in the US or Canada"
                  onPlaceChange={() => {
                    if (!pickerRef.current?.value) {
                      setCollege(undefined);
                    } else {
                      setCollege(pickerRef.current?.value);
                    }
                  }}
                />
                <PlaceOverview
                  size="large"
                  place={college}
                  googleLogoAlreadyDisplayed
                >
                  <div slot="action" className="SlotDiv">
                    <IconButton
                      slot="action"
                      variant="filled"
                      onClick={() => overlayLayoutRef.current?.showOverlay()}
                    >
                      See Reviews
                    </IconButton>
                  </div>
                  <div slot="action" className="SlotDiv">
                    <PlaceDirectionsButton slot="action" variant="filled">
                      Directions
                    </PlaceDirectionsButton>
                  </div>
                </PlaceOverview>
              </div>
              <div slot="overlay" className="SlotDiv">
                <IconButton
                  className="CloseButton"
                  onClick={() => overlayLayoutRef.current?.hideOverlay()}
                >
                  Close
                </IconButton>
                <PlaceDataProvider place={college}>
                  <PlaceReviews />
                </PlaceDataProvider>
              </div>
            </OverlayLayout>
          </div>
          <div className="h-full" slot="main">
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

              {college?.location && (
                <AdvancedMarker position={college?.location}>
                  <Pin
                    background={"#FBBC04"}
                    glyphColor={"#000"}
                    borderColor={"#000"}
                  />
                </AdvancedMarker>
              )}
            </Map>
          </div>
        </SplitLayout>
      </APIProvider>
    </div>
  );
}
