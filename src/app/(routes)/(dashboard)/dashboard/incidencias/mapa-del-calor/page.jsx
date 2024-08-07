"use client";
import { fetchIncidencias } from "@/utils/fetchingData";
import Mapa from "@/components/incidencia/maps/MapaCalor/Mapa";
import PageTitle from "@/components/PageTitle";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incidenciasData = await fetchIncidencias();
        setIncidencias(incidenciasData);
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="Mapa de calor" className="pb-4" />
      <Mapa
        data={incidencias}
        center={{ lat: -8.0798797, lng: -79.0027169 }}
        zoom={16}
        mapContainerStyle={{ width: "100%", height: "80vh" }}
      />
    </>
  );
}
