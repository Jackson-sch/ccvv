"use client";
import React, { useEffect, useState } from "react";
import Maps from "../../components/zonas/Maps/Maps";
import FormZonas from "../../components/zonas/FormZonas";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const [coordinates, setCoordinates] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [isPolygonComplete, setIsPolygonComplete] = useState(false);

  useEffect(() => {
    // Obtenga zonas existentes del servidor
    const fetchZonas = async () => {
      const response = await fetch("/api/zona");
      const data = await response.json();
      setZonas(data);
    };
    fetchZonas();
  }, []);

  const handleShapeComplete = (event) => {
    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      const path = event.overlay.getPath();
      const coords = path
        .getArray()
        .map((latlng) => [latlng.lat(), latlng.lng()]);
      setCoordinates(coords);
      setIsPolygonComplete(true);
    }
  };

  const bounds = {
    north: -8.0843273,
    east: -78.9990145,
    south: -8.0843273,
    west: -78.9990145,
  };

  const onSubmit = async (data) => {
    const zoneData = {
      ...data,
      coordinates,
      type: "polygon",
    };

    try {
      const response = await fetch("/api/zona", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zoneData),
      });

      if (response.ok) {
        const newZona = await response.json();
        setZonas([...zonas, newZona]);
        setIsPolygonComplete(false);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {isPolygonComplete && (
        <FormZonas coordinates={coordinates} onSubmit={onSubmit} />
      )}
      <Maps
        onShapeComplete={handleShapeComplete}
        bounds={bounds}
        zonas={zonas}
      />
    </>
  );
}
