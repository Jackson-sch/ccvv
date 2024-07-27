import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";

import { PlaceAutocomplete } from "./PlaceAutocomplete";

export const CustomMapControl = ({
  position,
  onPlaceSelect,
}) => {
  return (
    <MapControl position={ControlPosition.TOP_LEFT}>
      <div className="m-2 bg-transparent">
        <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
      </div>
    </MapControl>
  );
};
