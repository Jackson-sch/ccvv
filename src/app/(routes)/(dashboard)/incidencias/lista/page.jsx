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
  statusOptions,
} from "@/components/incidencia/data.jsx";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { fetchIncidencias } from "@/utils/fetchingData";

export default function page() {
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incidenciasData = await fetchIncidencias();
        setIncidencias(incidenciasData);
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/incidencia/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        setIncidencias((currentIncidencias) =>
          currentIncidencias.filter((inc) => inc._id !== id)
        );
        toast.success("Incidencia eliminada con éxito");
      } catch (error) {
        toast.error("Error al eliminar la incidencia");
      }
    }
  };

  return (
    <CardContent>
      <PageTitle title="Incidencias" />
      <TableUI
        title="Incidencias"
        data={incidencias}
        columns={columns}
        searchFields={searchFields}
        handleDelete={handleDelete}
        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        columnConfig={columnConfig}
        statusOptions={statusOptions}
      />
    </CardContent>
  );
}
