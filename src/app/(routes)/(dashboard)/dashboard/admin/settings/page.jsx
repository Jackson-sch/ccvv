import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import React from "react";
import Comisaria from "./comisaria/comisaria";
import Turno from "./turno/turno";

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <CardContent title="Comisaria">
        <PageTitle
          title="Comisaria"
          descripcion="En Este módulo se muestras las comisarias, podemos agregarlas o modificarlas"
        />
        <Comisaria />
      </CardContent>
      <CardContent title="Turno">
        <PageTitle
          title="Turno"
          descripcion="En este módulo se muestras los turnos de trabajo, puedes agregarlos o modificarlos"
        />
        {/* <Turno /> */}
      </CardContent>
      <CardContent title="Gravedad">
        <PageTitle
          title="Gravedad"
          descripcion="En este módulo se muestras las gravedades, puedes agregarlas o modificarlas"
        />
      </CardContent>
    </div>
  );
}
