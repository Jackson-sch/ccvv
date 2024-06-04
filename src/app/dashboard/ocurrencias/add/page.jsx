"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import toast from "react-hot-toast";
import Formulario from "@/components/ocurrencia/Formulario";

export default function page() {
  const [ocurrencias, setOcurrencias] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOcurrencia, setEditingOcurrencia] = useState({});
  const router = useRouter();
  const params = useParams();

  const fetchClasificacion = async () => {
    const response = await fetch("/api/clasificacion");
    const data = await response.json();
    setClasificaciones(data);
  };

  const fetchOcurrencia = async () => {
    try {
      const response = await fetch("/api/ocurrencia");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOcurrencias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOcurrencia = async (id) => {
    const response = await fetch(`/api/ocurrencia/${params.id}`);
    const data = await response.json();
    setEditingOcurrencia(data);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchClasificacion();
    
  }, []);

  useEffect(() => {
    fetchOcurrencia();
    const ocurrenciaId = params.id;
    if (ocurrenciaId) {
      getOcurrencia(ocurrenciaId);
    }
  }, [params.id]);

  const onSubmit = async (data) => {

   const url = isEditing
      ? `/api/ocurrencia/${params.id}`
      : "/api/ocurrencia";
    const method = isEditing ? "PUT" : "POST";

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
          ? "Ocurrencia actualizada correctamente"
          : "Ocurrencia creada con éxito"
      );
      router.push("/dashboard/ocurrencias");
      setIsEditing(false);
      setEditingOcurrencia({});
      fetchOcurrencia();
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <Formulario
      onSubmit={onSubmit}
      isEditing={isEditing}
      editingOcurrencia={editingOcurrencia}
      clasificaciones={clasificaciones}
    />
  );
}
