"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FormZonas from "@dashboard/components/zonas/FormZonas";
import { useRouter } from "next/navigation";
import { fetchZonas } from "@/utils/fetchingData";

// Cargar el componente Maps dinámicamente solo en el cliente
const Maps = dynamic(() => import("@dashboard/components/zonas/Maps/Maps"), {
  ssr: false, // Desactiva el renderizado en el servidor
});

export default function Page() {
  const [coordinates, setCoordinates] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [isPolygonComplete, setIsPolygonComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zonasData = await fetchZonas();
        setZonas(zonasData);
      } catch (error) {
        console.log("Error fetching zonas:", error);
      }
    };
    fetchData();
  }, []);

  const handleShapeComplete = (event) => {
    if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const path = event.overlay.getPath();
      const coords = path.getArray().map((latlng) => [latlng.lat(), latlng.lng()]);
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

  const handleCancel = () => {
    setIsPolygonComplete
      ? setIsPolygonComplete(false)
      : router.push("/dashboard/admin/zonas");
  };

  return (
    <>
      {isPolygonComplete && (
        <FormZonas
          coordinates={coordinates}
          onSubmit={onSubmit}
          handleCancel={handleCancel}
        />
      )}
      <Maps
        onShapeComplete={handleShapeComplete}
        bounds={bounds}
        zonas={zonas}
      />
    </>
  );
}
