"use client";
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Drawer from "@/components/Drawer";
import Formulario from "@dashboard/components/ubicacion/Formulario";
import MapsComponent from "@/components/maps/MapsComponent";
import { fetchMarkers } from "@/utils/fetchingData";
import { formInitialData, url } from "@dashboard/components/ubicacion/data";

export default function Page() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(formInitialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    setFormData(formInitialData);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ubicacionesData = await fetchMarkers();
        setMarkers(ubicacionesData);
      } catch (error) {
        console.log("Error fetching markers:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const response = await fetch("/api/ubicacion", {
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
  };

  const handleResetForm = () => {
    setFormData(formInitialData);
    setIsOpen(false);
  };

  return (
    <>
      <CardContent className="mb-4 flex justify-between">
        <div className="flex justify-between">
          <PageTitle title="Ubicación de Cámaras" />
          <Link href={`${url}/detalles`}>
            <Button color="secondary" variant="flat">
              Ir a Lista de Ubicaciones
            </Button>
          </Link>
        </div>
      </CardContent>

      <CardContent>
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
        >
          <Drawer title="Nueva ubicación" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Formulario
              formData={formData}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              handleResetForm={handleResetForm}
            />
          </Drawer>
        </MapsComponent>
      </CardContent>
    </>
  );
}
