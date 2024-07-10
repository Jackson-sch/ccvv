"use client";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { formInitialData } from "@/components/vehiculo/data";
import Formulario from "@/components/vehiculo/Formulario";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function page() {
  const [formData, setFormData] = useState(formInitialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    onSubmit({ ...formData, imageUrl: formData.imageUrl });
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/vehiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Vehículo agregado",
          text: "El vehículo ha sido agregado correctamente",
          timer: 1500,
        });
        setFormData("");
      } else {
        toast.error("Error al agregar el vehículo");
      }
    } catch (error) {
      toast.error("Error al enviar la solicitud");
      console.error("Error al agregar el vehículo:", error);
    }
  };

  const handleResetForm = () => {
    setFormData("");
  };

  return (
    <>
      <CardContent className="w-[80%] m-auto">
        <PageTitle
          title="Agregar Vehículo"
          descripcion="Este módulo permite ingresar información sobre vehículos que se encuentran bajo investigación o que han sido involucrados en actividades ilícitas. El objetivo es facilitar el seguimiento y la identificación de estos vehículos por parte de las autoridades competentes."
        />
        <Formulario
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleResetForm={handleResetForm}
        />
      </CardContent>
    </>
  );
}
