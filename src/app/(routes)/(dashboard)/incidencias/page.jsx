"use client";
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { formInitialData } from "@/components/incidencia/data";
import Drawer from "@/components/Drawer";
import Formulario from "@/components/incidencia/Formulario";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { format } from "@formkit/tempo";
import MapsComponent from "@/components/maps/MapsComponent";
import {
  fetchClasificaciones,
  fetchMarkers,
  fetchOcurrencias,
  fetchZonas,
  fetchNumeroCamara,
  fetchOperadores,
  fetchTurno,
  fetchComisarias,
  fetchGravedades,
} from "@/utils/fetchingData";

export default function Page() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const [fechaActual] = useState(new Date());
  const fecha = format(fechaActual, "YYYY-MM-DD");
  const hora = format(fechaActual, "HH:mm:ss");
  const [clasificacion, setClasificacion] = useState([]);
  const [ocurrencia, setOcurrencia] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [numeroCamara, setNumeroCamara] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [turno, setTurno] = useState([]);
  const [comisarias, setComisarias] = useState([]);
  const [gravedades, setGravedades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const markersData = await fetchMarkers();
        setMarkers(markersData);

        const clasificacionesData = await fetchClasificaciones();
        setClasificacion(clasificacionesData);

        const ocurrenciasData = await fetchOcurrencias();
        setOcurrencia(ocurrenciasData);

        const zonasData = await fetchZonas();
        setZonas(zonasData);

        const numeroCamaraData = await fetchNumeroCamara();
        setNumeroCamara(numeroCamaraData);

        const operadoresData = await fetchOperadores();
        setOperadores(operadoresData);

        const turnoData = await fetchTurno();
        setTurno(turnoData);

        const comisariasData = await fetchComisarias();
        setComisarias(comisariasData);

        const gravedadesData = await fetchGravedades();
        setGravedades(gravedadesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    onSubmit({ ...formData, imageUrl: formData.imageUrl });
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/incidencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Incidencia registrada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchMarkers();
      } else {
        toast.error("Error al registrar la incidencia");
      }
    } catch (error) {
      toast.error("Error al enviar la solicitud");
      console.error("Error submitting form:", error);
    }
  };

  const handleResetForm = () => {
    setFormData(formInitialData);
    setIsOpen(false);
  };

  return (
    <CardContent>
      <PageTitle title="Registro de Incidencias" />
      <MapsComponent
        markers={markers}
        center={{ lat: -8.0798797, lng: -79.0027169 }}
        zoom={16}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        newMarker={newMarker}
        setNewMarker={setNewMarker}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formData={formData}
        setFormData={setFormData}
        fecha={fecha}
        hora={hora}
      />
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Registrar Incidencia"
      >
        <Formulario
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleResetForm={handleResetForm}
          clasificacion={clasificacion}
          ocurrencia={ocurrencia}
          zonas={zonas}
          numeroCamara={numeroCamara}
          operadores={operadores}
          turno={turno}
          comisarias={comisarias}
          gravedades={gravedades}
        />
      </Drawer>
    </CardContent>
  );
}
