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
} from "@dashboard/components/ocurrencia/data";
import toast from "react-hot-toast";
import { fetchOcurrencias } from "@/utils/fetchingData";

export default function Page() {
  const [ocurrencias, setOcurrencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ocurrenciasData = await fetchOcurrencias();
        setOcurrencias(ocurrenciasData);
      } catch (error) {
        console.log("Error fetching ocurrencias:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/ocurrencia/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Actualiza el estado de los usuarios para reflejar la eliminación
      setOcurrencias((currentOcurrencias) =>
        currentOcurrencias.filter((ocurrencia) => ocurrencia._id !== id)
      );
      toast.success("Ocurrencia eliminada con éxito");
      console.log("Ocurrencia eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la ocurrencia:", error);
      // Maneja el error de eliminación
      alert("Error al eliminar la ocurrencia");
    }
  };

  return (
    <CardContent>
      <PageTitle title="Tipos de Ocurrencias" />
      <TableUI
        title="Ocurrencias"
        data={ocurrencias}
        columns={columns}
        searchFields={searchFields}
        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        handleDelete={handleDelete}
        columnConfig={columnConfig}
        url={url}
      />
    </CardContent>
  );
}
