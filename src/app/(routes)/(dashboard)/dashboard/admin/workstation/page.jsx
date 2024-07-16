import React from "react";
import PageTitle from "@/components/PageTitle";
import ButtonAdd from "../../components/workstation/ButtonAdd/ButtonAdd";
import ListWorkstation from "../../components/workstation/ListWorkstation/ListWorkstation";

export default function page() {
  return (
    <div>
      <PageTitle
        title="Estaciones de Trabajo"
        descripcion="Este modulo se muestra todas las pc's que están dentro de la sala de Monitoreo"
      />
      <div className="flex justify-end">
        <ButtonAdd />
      </div>
      <ListWorkstation />
    </div>
  );
}
