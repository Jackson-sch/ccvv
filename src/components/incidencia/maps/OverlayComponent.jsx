import React, { useRef } from "react";
import {
  OverlayLayout,
  IconButton,
  PlaceDataProvider,
  PlaceReviews,
} from "@googlemaps/extended-component-library/react";

const OverlayComponent = ({ college }) => {
  const overlayLayoutRef = useRef(null);

  return (
    <OverlayLayout ref={overlayLayoutRef}>
      <div slot="overlay" className="contents">
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
  );
};

export default OverlayComponent;
