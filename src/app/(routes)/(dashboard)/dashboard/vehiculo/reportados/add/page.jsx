"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { formInitialData } from "../../../../../../../components/vehiculo/data";
import Formulario from "../../../../../../../components/vehiculo/Formulario";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  fetchVehiculos,
  fetchGravedades,
  fetchMarcas,
} from "@/utils/fetchingData";

export default function Page() {
  const [marcas, setMarcas] = useState([]);
  const [gravedades, setGravedades] = useState([]);
  const [formData, setFormData] = useState(formInitialData);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const params = useParams();

  const getVehiculo = useCallback(async (id) => {
    const response = await fetch(`/api/vehiculo/${id}`);
    const data = await response.json();
    setFormData(data);
    setIsEditing(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gravedadesData = await fetchGravedades();
        setGravedades(gravedadesData);

        const marcasData = await fetchMarcas();
        setMarcas(marcasData);

        const vehiculoId = params.id;
        if (vehiculoId) {
          await getVehiculo(vehiculoId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.id, getVehiculo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    onSubmit({ ...formData, imageUrl: formData.imageUrl });
  };

  const onSubmit = async (data) => {
    const url = isEditing ? `/api/vehiculo/${params.id}` : "/api/vehiculo";
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          isEditing
            ? "Vehículo actualizado correctamente"
            : "Vehículo creado con éxito"
        );
        router.push("/vehiculo/reportados");
        setIsEditing(false);
        setFormData(formInitialData);
        fetchVehiculos();
      } else {
        toast.error("Error al agregar el vehículo");
      }
    } catch (error) {
      toast.error("Error al enviar la solicitud");
      console.error("Error al agregar el vehículo:", error);
    }
  };

  const handleResetForm = () => {
    setIsEditing(false);
    setFormData(formInitialData);
    router.push("/vehiculo/reportados");
  };

  return (
    <>
      <CardContent className="w-[80%] m-auto">
        <PageTitle
          title={!isEditing ? "Agregar Vehículo" : "Editar Vehículo"}
          descripcion="Este módulo permite ingresar información sobre vehículos que se encuentran bajo investigación o que han sido involucrados en actividades ilícitas. El objetivo es facilitar el seguimiento y la identificación de estos vehículos por parte de las autoridades competentes."
        />
        <Formulario
          formData={formData}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleResetForm={handleResetForm}
          gravedades={gravedades}
          marcas={marcas}
        />
      </CardContent>
    </>
  );
}
