"use client";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import ButtonAdd from "../../../components/settings/(gravedad)/ButtonAdd/ButtonAdd";
import ListTable from "../../../components/settings/ListTable/ListTable";

export default function Gravedad() {
  const [gravedades, setGravedades] = useState([]);

  useEffect(() => {
    const fetchGravedades = async () => {
      try {
        const response = await fetch("/api/gravedad");
        const data = await response.json();
        setGravedades(data);
      } catch (error) {
        console.error("Error fetching gravedad:", error);
      }
    };

    fetchGravedades();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/gravedad/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Actualiza el estado de la gravedad para reflejar la eliminación
      setGravedades((currentGravedad) =>
        currentGravedad.filter((g) => g._id !== id)
      );
      toast.success("Registro eliminado con éxito");
    } catch (error) {
      console.error("Error deleting Gravedad:", error);
      alert("Error deleting gravedad");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/gravedad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedGravedad = await response.json();
        setGravedades([...gravedades, savedGravedad]);
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
      <ListTable data={gravedades} handleDelete={handleDelete} />
    </>
  );
}

const TopContent = ({ onSubmit }) => {
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
