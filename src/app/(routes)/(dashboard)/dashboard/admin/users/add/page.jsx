"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Formulario from "@/components/users/Formulario";
import { initialUserData } from "@/utils/initialUserData";
import toast from "react-hot-toast";

export default function AddPage() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(initialUserData);
  const router = useRouter();
  const params = useParams();

  const fetchUser = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    setUsers(data);
  };

  const getUser = async (id) => {
    const response = await fetch(`/api/user/${params.id}`);
    const data = await response.json();
    setEditingUser(data);
    setIsEditing(true);
  }

  useEffect(() => {
    fetchUser();
    const userId = params.id;
    if (userId) {
      getUser(userId);
    }
  }, [params.id]);
  
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
      toast.success(isEditing ? "Usuario actualizado correctamente" : "Usuario creado con éxito");
      router.push("/dashboard/users");
      setIsEditing(false);
      setEditingUser(initialUserData);
      fetchUser();
    } else {
      console.error("Error:", response.statusText);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingUser(initialUserData);
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
