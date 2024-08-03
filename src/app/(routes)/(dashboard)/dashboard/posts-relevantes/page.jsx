"use client";
import { fetchIncidencias, fetchVehiculos } from "@/utils/fetchingData";
import Posts from "@/components/incidencia/posts/Posts";
import PostsVehiculos from "@/components/vehiculo/posts/Posts";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";

export default function Page() {
  const [incidenciasRelevantes, setIncidenciasRelevantes] = useState([]);
  const [vehiculoReportado, setVehiculoReportado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching incidencias
        const incidenciasData = await fetchIncidencias();
        // Ordena los datos por fecha y hora. Asegúrate de ajustar 'fecha' y 'hora' a tus campos reales.
        const datosOrdenados = incidenciasData.sort((a, b) => {
          const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
          const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
          return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
        });
        const ultimosCincoRegistros = datosOrdenados.slice(0, 5); // Toma los últimos 5 elementos después de ordenar
        setIncidenciasRelevantes(ultimosCincoRegistros);

        // Fetching vehiculos
        const vehiculosData = await fetchVehiculos();
        const ultimosCinco = vehiculosData.slice(0, 5);
        setVehiculoReportado(ultimosCinco);
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container w-3/4 flex flex-col m-auto items-center">
      <Tabs aria-label="Options" size="md" className="fixed top-20 z-50">
        <Tab key="photos" title="Incidencias más Relevantes">
          <Posts data={incidenciasRelevantes} />
        </Tab>
        <Tab key="music" title="Vehículos Reportados">
          <PostsVehiculos data={vehiculoReportado} />
        </Tab>
      </Tabs>
    </div>
  );
}
