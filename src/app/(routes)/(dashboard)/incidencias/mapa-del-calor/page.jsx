"use client";
import Mapa from "@/components/incidencia/maps/Mapa";
import React, { useEffect, useState } from "react";

export default function page() {
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/incidencia");
      const data = await response.json();
      setIncidencias(data);
    };
    fetchData();
  }, []);

  return (
    <Mapa
      data={incidencias}
      center={{ lat: -8.0798797, lng: -79.0027169 }}
      zoom={16}
    />
  );
}
