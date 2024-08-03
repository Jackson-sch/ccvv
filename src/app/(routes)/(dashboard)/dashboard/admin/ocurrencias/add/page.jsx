"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { fetchClasificaciones, fetchOcurrencias } from "@/utils/fetchingData";
import Formulario from "@dashboard/components/ocurrencia/Formulario";

export default function Page() {
  const [ocurrencias, setOcurrencias] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  console.log("🚀 ~ page ~ clasificaciones:", clasificaciones);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOcurrencia, setEditingOcurrencia] = useState({});
  const router = useRouter();
  const params = useParams();

  // Memorizar getOcurrencia para evitar la advertencia de dependencias
  const getOcurrencia = useCallback(async (id) => {
    const response = await fetch(`/api/ocurrencia/${id}`);
    const data = await response.json();
    setEditingOcurrencia(data);
    setIsEditing(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clasificacionesData = await fetchClasificaciones();
        setClasificaciones(clasificacionesData);

        const ocurrenciasData = await fetchOcurrencias();
        setOcurrencias(ocurrenciasData);

        const ocurrenciaId = params.id;
        if (ocurrenciaId) {
          getOcurrencia(ocurrenciaId);
        }
      } catch (error) {
        console.log("Error fetching ocurrencias:", error);
      }
    };

    fetchData();
  }, [params.id, getOcurrencia]);  // Incluye getOcurrencia en las dependencias

  const onSubmit = async (data) => {
    const url = isEditing ? `/api/ocurrencia/${params.id}` : "/api/ocurrencia";
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
          : "Ocurrencia creada con éxito"
      );
      router.push("/dashboard/admin/ocurrencias");
      setIsEditing(false);
      setEditingOcurrencia({});
      setOcurrencias([]);
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
