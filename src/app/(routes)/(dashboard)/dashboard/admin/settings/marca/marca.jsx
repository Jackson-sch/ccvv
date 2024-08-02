"use client";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import ButtonAdd from "../../../components/settings/(marca)/ButtonAdd/ButtonAdd";
import ListTable from "../../../components/settings/ListTable/ListTable";
import { fetchMarcas } from "@/utils/fetchingData";

export default function Marca() {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMarcas();
        setMarcas(response);
      } catch (error) {
        console.error("Error fetching gravedad:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/marca/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Actualiza el estado de la marca para reflejar la eliminación
      setMarcas((currentMarca) =>
        currentMarca.filter((marca) => marca._id !== id)
      );
      toast.success("Registro eliminado con éxito");
    } catch (error) {
      console.error("Error deleting marca:", error);
      alert("Error deleting marca");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/marca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedMarca = await response.json();
        setMarcas([...marcas, savedMarca]);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <TopContent onSubmit={onSubmit} />
      <ListTable data={marcas} handleDelete={handleDelete} />
    </>
  );
}

export const TopContent = ({ onSubmit }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-3 items-end">
        {/* <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by name..."
          size="sm"
          startContent={
            <SearchIcon
              size={18}
              strokeWidth={1}
              className="text-default-300"
            />
          }
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        /> */}
        <ButtonAdd onSubmit={onSubmit} />
      </div>
    </div>
  );
};
