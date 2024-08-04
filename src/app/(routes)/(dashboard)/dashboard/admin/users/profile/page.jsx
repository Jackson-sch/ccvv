"use client";
import React, { useEffect, useState } from "react";
import Hero from "@dashboard/components/users/profile/Hero";
import Profile from "@dashboard/components/users/profile/Profile";
import { Tab, Tabs } from "@nextui-org/react";
import Formulario from "@dashboard/components/users/Formulario";
import Posts from "@/components/incidencia/posts/Posts";
import { fetchIncidencias, fetchUsers } from "@/utils/fetchingData";

import { useAuth, useUser } from "@clerk/nextjs";
import { isAdministrator } from "@/utils/isAdministrator";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const router = useRouter();
  const { userId } = useAuth();
  const { user: userData } = useUser();
  console.log("🚀 ~ Page ~ userData:", userData)

  useEffect(() => {
    const fetchData = async () => {
      // Verifica la identidad del usuario y redirige a la página de inicio si no es administrador
      if (!userId || !isAdministrator(userId)) {
        router.push("/");
        return;
      }

      // Obtén los datos de incidencias
      const incidenciasData = await fetchIncidencias();
      // Ordena los datos por fecha y hora. Asegúrate de ajustar 'fecha' y 'hora' a tus campos reales.
      const datosOrdenados = incidenciasData.sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
        return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
      });
      // Toma los últimos 5 elementos después de ordenar
      const ultimosCincoRegistros = datosOrdenados.slice(0, 5);
      setPosts(ultimosCincoRegistros);

      // Obten los daots de users
      const usersData = await fetchUsers();
      setUser(usersData);
    };
    fetchData();
  }, [userId, router]);

  return (
    <>
      <Hero data={user} />
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
        <div className="row-span-3">
          <Profile data={userData} />
        </div>
        <div className="col-span-2 w-full h-screen">
          <Tabs aria-label="Profile Tabs">
            <Tab key="posts" title="Posts">
              <Posts data={posts} />
            </Tab>
            <Tab key="perfil" title="Perfil">
              <Formulario />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
