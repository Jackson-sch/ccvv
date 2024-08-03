import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import React from "react";
import Comisaria from "./comisaria/comisaria";
import Turno from "./turno/turno";
import Gravedad from "./gravedad/gravedad";
import Marca from "./marca/marca";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdministrator } from "@/utils/isAdministrator";

export default async function page() {
  const {userId }= auth()
  const user = await currentUser();

  if (!userId || !user || !isAdministrator(userId)) {
    return redirect("/");
  }
  
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
