'use client'
import { CardContent } from '@/components/Card';
import Posts from '@/components/users/profile/Posts';
import PostsVehiculos from '@/components/vehiculo/Posts';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [incidenciasRelevantes, setIncidenciasRelevantes] = useState([]);
    const [vehiculoReportado, setVehiculoReportado] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/incidencia");
        const data = await response.json();
        // Ordena los datos por fecha y hora. Asegúrate de ajustar 'fecha' y 'hora' a tus campos reales.
        const datosOrdenados = data.sort((a, b) => {
          const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
          const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
          return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
        });
        // Toma los últimos 5 elementos después de ordenar
        const ultimosCincoRegistros = datosOrdenados.slice(0, 5);
        setIncidenciasRelevantes(ultimosCincoRegistros);
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/vehiculo");
        const data = await response.json();
        const ultimosCinco = data.slice(0, 5);
        setVehiculoReportado(ultimosCinco);
      };
      fetchData();
    }, []);

  return (
    <div className='container w-3/4 flex flex-col m-auto items-center'>
        <Tabs aria-label="Options" size='md' className='fixed top-20 z-50' >
          <Tab key="photos" title="Incidencias más Relevantes">
            <Posts data={incidenciasRelevantes} />
          </Tab>
          <Tab key="music" title="Vehículos Reportados">
            <PostsVehiculos data={vehiculoReportado} />
          </Tab>
        </Tabs>
    </div>
  )
}
