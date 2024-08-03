"use client";
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import {
  url,
  statusColorMap,
} from "@/components/vehiculo/data";

import InputSearch from "@/components/vehiculo/InputSearch";
import Pagination from "@/components/vehiculo/Pagination";
import ButtonAdd from "@/components/vehiculo/ButtonAdd";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CardVehiculo from "@/components/vehiculo/CardVehiculo";
import { fetchVehiculos } from "@/utils/fetchingData";

export default function Page() {
  const [vehiculosReportados, setVehiculosReportados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiculosData = await fetchVehiculos();
        setVehiculosReportados(vehiculosData);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
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
        const response = await fetch(`/api/vehiculo/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        // Actualiza el estado de los vehículos para reflejar la eliminación
        setVehiculosReportados((currentVehiculos) =>
          currentVehiculos.filter((vehiculo) => vehiculo._id !== id)
        );
        toast.success("Vehículo eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el vehículo:", error);
        alert("Error al eliminar el vehículo");
      }
    }
  };

  // Manejar el cambio en el input de búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filtrar los vehículos reportados
  const filteredVehiculos = vehiculosReportados.filter(
    (vehiculo) =>
      vehiculo.placa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.prioridad?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcula los vehiculos a mostrar en la pagina
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehiculos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calcular el total de registros
  const totalItems = Math.ceil(filteredVehiculos.length / itemsPerPage);
  const total = Math.ceil(vehiculosReportados.length);

  return (
    <>
      <CardContent className=" mb-4">
        <PageTitle
          title="Vehículos reportados"
          descripcion="En este módulo se encuentran los vehículos reportados, ya sea por robo o por cualquier tipo de requisitoria que presenten."
        />
        <div className="flex justify-between items-center my-6">
          <InputSearch onChange={handleSearch} value={searchTerm} />
          <ButtonAdd url={url} />
        </div>
        <span className="text-sm text-default-500">
          Total vehículos reportados: {total}{" "}
        </span>
        <CardVehiculo
          data={currentItems}
          url={url}
          handleDelete={handleDelete}
          statusColorMap={statusColorMap}
        />
        <Pagination
          totalItems={totalItems}
          initialPage={1}
          currentPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </CardContent>
    </>
  );
}
