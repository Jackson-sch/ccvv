'use client'
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import MapsComponent from "@/components/maps/MapsComponent";
import { formInitialData } from "@/components/incidencia/data";
import Drawer from "@/components/Drawer";
import Formulario from "@/components/incidencia/Formulario";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { format } from "@formkit/tempo";

export default function Page() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const [fechaActual] = useState(new Date());
  const fecha = format(fechaActual, "YYYY-MM-DD");
  const hora = format(fechaActual, "HH:mm:ss" );
  const [clasificacion, setClasificacion] = useState([]);
  const [ocurrencia, setOcurrencia] = useState([]);
 
  

  useEffect(() => {
    const fetchData = async () => {
      await fetchMarkers();
      await fetchClasificaciones();
      await fetchOcurrencias();
    };
    fetchData();
  }, []);

  const fetchMarkers = async () => {
    try {
      const response = await fetch("/api/ubicacion");
      const data = await response.json();
      setMarkers(data);
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };

  const fetchClasificaciones = async () => {
    try {
      const response = await fetch("/api/clasificacion");
      const data = await response.json();
      setClasificacion(data);
    } catch (error) {
      console.error("Error fetching clasificaciones:", error);
    }
  };

  const fetchOcurrencias = async () => {
    try {
      const response = await fetch("/api/ocurrencia");
      const data = await response.json();
      setOcurrencia(data);
    } catch (error) {
      console.error("Error fetching ocurrencias:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    onSubmit({...formData, imageUrl: formData.imageUrl });
    /* setFormData(formInitialData); */
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
          title: "Ubicación creada con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchMarkers();
      } else {
        toast.error("Error al crear la ubicación");
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
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Registrar Incidencia">
        <Formulario
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleResetForm={handleResetForm}
          clasificacion={clasificacion}
          ocurrencia={ocurrencia}
        />
      </Drawer>
    </CardContent>
  );
}
