"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonAdd from "@dashboard/components/settings/(turno)/ButtonAdd/ButtonAdd";
import ListTable from "@dashboard/components/settings/ListTable/ListTable";

export default function Turno() {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch("/api/turno");
        const data = await response.json();
        setTurnos(data);
      } catch (error) {
        console.error("Error fetching comisarias:", error);
      }
    };

    fetchTurnos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/turno/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Actualiza el estado de las turnos para reflejar la eliminación
      setTurnos((currentTurnos) => currentTurnos.filter((t) => t._id !== id));
      toast.success("Turno eliminada con éxito");
    } catch (error) {
      console.error("Error deleting Turno:", error);
      alert("Error deleting turno");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/turno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedTurno = await response.json();
        setTurnos([...turnos, savedTurno]);
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
      <ListTable data={turnos} handleDelete={handleDelete} />
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
