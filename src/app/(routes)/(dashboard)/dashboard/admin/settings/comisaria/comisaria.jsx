"use client";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ButtonAdd from "../../../components/settings/ButtonAdd/ButtonAdd";
import ListComisaria from "../../../components/settings/ListComisaria/ListComisaria";
import toast from "react-hot-toast";

export default function Comisaria() {
  const [comisarias, setComisarias] = useState([]);

  useEffect(() => {
    const fetchComisarias = async () => {
      try {
        const response = await fetch("/api/comisaria");
        const data = await response.json();
        setComisarias(data);
      } catch (error) {
        console.error("Error fetching comisarias:", error);
      }
    };

    fetchComisarias();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/comisaria/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Actualiza el estado de las comisarias para reflejar la eliminación
      setComisarias((currentComisarias) => currentComisarias.filter((c) => c._id !== id));
      toast.success("Comisaria eliminada con éxito");
    } catch (error) {
      console.error("Error deleting comisaria:", error);
      alert("Error deleting comisaria");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/comisaria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedComisaria = await response.json();
        setComisarias([...comisarias, savedComisaria]);
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
      <ListComisaria comisarias={comisarias} handleDelete={handleDelete} />
    </>
  );
}

const TopContent = ({ onSubmit }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
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
          /* value={filterValue} */
          variant="bordered"
          /* onClear={() => setFilterValue("")} */
          /* onValueChange={onSearchChange} */
        />
        <ButtonAdd onSubmit={onSubmit} />
      </div>
    </div>
  );
};
