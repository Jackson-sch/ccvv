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
  statusColorMap
} from "@/components/vehiculo/data";
import CardVehiculo from "@/components/vehiculo/CardVehiculo";
import InputSearch from "@/components/vehiculo/InputSearch";
import Pagination from "@/components/vehiculo/Pagination";
import ButtonAdd from "@/components/vehiculo/ButtonAdd";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function page() {
  const [vehiculosReportados, setVehiculosReportados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("/api/vehiculo")
      .then((res) => res.json())
      .then((data) => setVehiculosReportados(data));
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
      vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.color.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="flex justify-between items-center my-6">
          <InputSearch onChange={handleSearch} value={searchTerm} />
          <ButtonAdd url={url} />
        </div>
        <span className="text-sm text-default-500">Total vehículos reportados: {total} </span>
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
