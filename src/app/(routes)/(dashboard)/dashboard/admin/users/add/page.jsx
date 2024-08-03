"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Formulario from "@dashboard/components/users/Formulario";
import { initialUserData } from "@/utils/initialUserData";
import toast from "react-hot-toast";
import { fetchUsers } from "@/utils/fetchingData";

export default function AddPage() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(initialUserData);
  const router = useRouter();
  const params = useParams();

  const getUser = useCallback(async (id) => {
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    setEditingUser(data);
    setIsEditing(true);
  }, []); // La función getUser no cambia y se estabiliza con useCallback

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);

        const userId = params.id;
        if (userId) {
          await getUser(userId); // Llamar a la función estabilizada
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchData();
  }, [params.id, getUser]); // Agregar getUser a la lista de dependencias

  const onSubmit = async (data) => {
    const url = isEditing ? `/api/user/${params.id}` : "/api/user";
    const method = isEditing ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(
        isEditing
          ? "Usuario actualizado correctamente"
          : "Usuario creado con éxito"
      );
      router.push("/dashboard/admin/users");
      setIsEditing(false);
      setEditingUser(initialUserData);
      setUsers();
    } else {
      console.error("Error:", response.statusText);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingUser(initialUserData);
    router.push("/dashboard/admin/users");
  };

  return (
    <Formulario
      onSubmit={onSubmit}
      editingUser={editingUser}
      isEditing={isEditing}
      resetForm={resetForm}
    />
  );
}
