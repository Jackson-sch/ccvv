'use client'
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import ButtonAdd from "../../components/workstation/ButtonAdd/ButtonAdd";
import ListWorkstation from "../../components/workstation/ListWorkstation/ListWorkstation";

export default function page() {
  const [operadores, setOperadores] = useState([]);

  useEffect(() => {
    // Obtenga workstations existentes del servidor
    const fetchWorkstations = async () => {
      const response = await fetch("/api/workstation");
      const data = await response.json();
      setOperadores(data);
    };
    fetchWorkstations();
  }, []);
  

const onSubmit = async (data) => {
  try {
    const response = await fetch("/api/workstation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const savedWorkstation = await response.json();
      setOperadores([...operadores, savedWorkstation]);
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

  return (
    <div>
      <PageTitle
        title="Estaciones de Trabajo"
        descripcion="Este modulo se muestra todas las pc's que están dentro de la sala de Monitoreo"
      />
      <div className="flex justify-end">
        <ButtonAdd onSubmit={onSubmit} />
      </div>
      <div>
        
      </div>
      <ListWorkstation operadores={operadores} />
    </div>
  );
}
