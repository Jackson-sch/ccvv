"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Formulario from "@/components/clasificacion/Formulario";
import toast from "react-hot-toast";

export default function page() {
  const [clasificacion, setClasificacion] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingClasificacion, setEditingClasificacion] = useState({});
  const router = useRouter();
  const params = useParams();

  const fetchClasificacion = async () => {
    const response = await fetch("/api/clasificacion");
    const data = await response.json();
    setClasificacion(data);
  };

  const getClasificacion = async (id) => {
    const response = await fetch(`/api/clasificacion/${params.id}`);
    const data = await response.json();
    setEditingClasificacion(data);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchClasificacion();
    const clasificacionId = params.id;
    if (clasificacionId) {
      getClasificacion(clasificacionId);
    }
  }, [params.id]);

  const onSubmit = async (data) => {
    const url = isEditing
      ? `/api/clasificacion/${params.id}`
      : "/api/clasificacion";
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
          ? "Clasificación actualizada correctamente"
          : "Clasificación creada con éxito"
      );
      router.push("/dashboard/clasificacion");
      setIsEditing(false);
      setEditingClasificacion({});
      fetchClasificacion();
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <Formulario
      onSubmit={onSubmit}
      isEditing={isEditing}
      editingClasificacion={editingClasificacion}
    />
  );
}
