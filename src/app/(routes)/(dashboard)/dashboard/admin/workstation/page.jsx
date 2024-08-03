"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import ButtonAdd from "@dashboard/components/workstation/ButtonAdd/ButtonAdd";
import ListWorkstation from "@dashboard/components/workstation/ListWorkstation/ListWorkstation";
import { fetchWorkstations } from "@/utils/fetchingData";

import { useAuth } from "@clerk/nextjs";
import { isAdministrator } from "@/utils/isAdministrator";
import { useRouter } from "next/navigation";

export default function Page() {
  const [operadores, setOperadores] = useState([]);

  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica la identidad del usuario y redirige a la página de inicio si no es administrador
        if (!userId || !isAdministrator(userId)) {
          router.push("/");
          return;
        }

        const operadoresData = await fetchWorkstations();
        setOperadores(operadoresData);
      } catch (error) {
        console.log("Error fetching operadores:", error);
      }
    };
    fetchData();
  }, [userId, router]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/workstation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedWorkstation = await response.json();
        setOperadores([...operadores, savedWorkstation]);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <PageTitle
        title="Estaciones de Trabajo"
        descripcion="Este modulo se muestra todas las pc's que están dentro de la sala de Monitoreo"
      />
      <div className="flex justify-end">
        <ButtonAdd onSubmit={onSubmit} />
      </div>
      <div></div>
      <ListWorkstation operadores={operadores} />
    </div>
  );
}
