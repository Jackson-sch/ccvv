"use client";
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import TableUI from "@/components/TableUI/TableUI";
import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  searchFields,
  columnConfig,
  url,
} from "@/components/clasificacion/data";
import toast from "react-hot-toast";

export default function page() {
  const [clasificacion, setClasificacion] = useState([]);

  useEffect(() => {
    fetch("/api/clasificacion")
      .then((res) => res.json())
      .then((data) => setClasificacion(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/clasificacion/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Actualiza el estado de los usuarios para reflejar la eliminación
      setClasificacion((currentClasificacion) =>
        currentClasificacion.filter(
          (clasificacion) => clasificacion._id !== id
        )
      );
      toast.success("Clasificación eliminada con éxito");
      console.log("Clasificación eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la clasificación:", error);
      // Maneja el error de eliminación
      alert("Error al eliminar la clasificación");
    }
  };

  return (
    <CardContent>
      <PageTitle title="Clasificaciones" />
      <TableUI
        title="Clasificaciones"
        data={clasificacion}
        columns={columns}
        searchFields={searchFields}
        handleDelete={handleDelete}
        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        columnConfig={columnConfig}
        url={url}
      />
    </CardContent>
  );
}
