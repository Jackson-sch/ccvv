"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import { CardContent } from "@/components/Card";
import TableUI from "@/components/TableUI/TableUI";
import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  searchFields,
  columnConfig,
  statusOptions,
} from "@dashboard/components/ubicacion/data";
import { fetchUbicaciones } from "@/utils/fetchingData";

import { useAuth } from "@clerk/nextjs";
import { isAdministrator } from "@/utils/isAdministrator";
import { useRouter } from "next/navigation";

export default function Page() {
  const [ubicacion, setUbicacion] = useState([]);

  const router = useRouter();
  const { userId } = useAuth();

  // Obtiene la lista de ubicaciones
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica la identidad del usuario y redirige a la página de inicio si no es administrador
        if (!userId || !isAdministrator(userId)) {
          router.push("/");
          return;
        }

        const ubicacionesData = await fetchUbicaciones();
        setUbicacion(ubicacionesData);
      } catch (error) {
        console.log("Error fetching markers:", error);
      }
    };
    fetchData();
  }, [userId, router]);

  // función para eliminar una ubicacion
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
        const response = await fetch(`/api/ubicacion/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        // Actualiza el estado de los usuarios para reflejar la eliminación
        setUbicacion((currentUbicaciones) =>
          currentUbicaciones.filter((ub) => ub._id !== id)
        );
        toast.success("Ubicación eliminada con éxito");
      } catch (error) {
        // Maneja el error de eliminación
        toast.error("Error al eliminar la ubicación");
      }
    }
  };

  return (
    <CardContent>
      <TableUI
        title="Cámaras"
        data={ubicacion}
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
