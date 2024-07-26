import React, { useRef } from "react";
import {
  PlacePicker,
  PlaceOverview,
  IconButton,
  PlaceDirectionsButton,
} from "@googlemaps/extended-component-library/react";
import { Input } from "@nextui-org/react";

const PlacePickerComponent = ({ college, setCollege }) => {
  const pickerRef = useRef(null);
  const overlayLayoutRef = useRef(null);

  return (
    <div className="flex flex-col h-screen gap-4" slot="main">
      <PlacePicker
        className="m-1 flex flex-grow-1"
        ref={pickerRef}
        forMap="gmap"
        country={["pe"]}
        placeholder="search..."
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
        <div slot="action" className="contents">
          <IconButton
            slot="action"
            variant="filled"
            onClick={() => overlayLayoutRef.current?.showOverlay()}
          >
            See Reviews
          </IconButton>
        </div>
        <div slot="action" className="contents">
          <PlaceDirectionsButton slot="action" variant="filled">
            Directions
          </PlaceDirectionsButton>
        </div>
      </PlaceOverview>
    </div>
  );
};

export default PlacePickerComponent;
