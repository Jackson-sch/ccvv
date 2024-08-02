import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import React from "react";
import Comisaria from "./comisaria/comisaria";
import Turno from "./turno/turno";
import Gravedad from "./gravedad/gravedad";
import Marca from "./marca/marca";


export default function page() {
  return (
    <div className="grid pb-8 grid-cols-1 gap-4 lg:grid-cols-2">
      <CardContent title="Comisaria">
        <PageTitle
          title="Comisaria"
          descripcion="En Este módulo se muestras las comisarias, podemos agregarlas o eliminarlas"
        />
        <Comisaria />
      </CardContent>
      <CardContent title="Turno">
        <PageTitle
          title="Turno"
          descripcion="En este módulo se muestras los turnos de trabajo, puedes agregarlos o eliminarlos"
        />
        <Turno />
      </CardContent>
      <CardContent title="Gravedad">
        <PageTitle
          title="Gravedad de Incidencias"
          descripcion="En este módulo se muestras las gravedades, puedes agregarlas o eliminarlas"
        />
        <Gravedad />
      </CardContent>
      <CardContent title="Marcas">
        <PageTitle
          title="Marcas"
          descripcion="En este módulo se muestras las marcas, puedes agregarlas o eliminarlas"
        />
        <Marca />
      </CardContent>
    </div>
  );
}
