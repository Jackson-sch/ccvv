"use client";
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import TableUI from "@/components/TableUI/TableUI";
import {
  columns,
  statusOptions,
  INITIAL_VISIBLE_COLUMNS,
  searchFields,
  columnConfig,
  url,
} from "@/components/users/data";
import PageTitle from "@/components/PageTitle";
import toast from "react-hot-toast";
import { fetchUsers } from "@/utils/fetchingData";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Actualiza el estado de los usuarios para reflejar la eliminación
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== id)
      );

      toast.success("Usuario eliminado con éxito");

      console.log("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      // Maneja el error de eliminación
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <>
      <CardContent>
        <PageTitle title="Usuarios" />
        <TableUI
          title="Usuarios"
          data={users}
          columns={columns}
          statusOptions={statusOptions}
          searchFields={searchFields}
          handleDelete={handleDelete}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
          columnConfig={columnConfig}
          url={url}
        />
      </CardContent>
    </>
  );
}
