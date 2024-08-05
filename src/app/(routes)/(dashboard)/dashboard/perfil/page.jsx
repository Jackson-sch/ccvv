"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/profile/Hero";
import Profile from "@/components/profile/Profile";
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
  console.log("🚀 ~ Page ~ posts:", posts)

  const router = useRouter();
  const { user: userData } = useUser();
  console.log("🚀 ~ Page ~ userData:", userData);



  useEffect(() => {
    const fetchData = async () => {
      // Obtén los datos de incidencias
      const incidenciasData = await fetchIncidencias();

      // Filtra los posts que correspondan al usuario actual
      const filteredPosts = incidenciasData.filter(post => post.nombres_apellidos === userData?.fullName);
      console.log("🚀 ~ fetchData ~ filteredPosts:", filteredPosts)

      // Ordena los datos por fecha y hora. Asegúrate de ajustar 'fecha' y 'hora' a tus campos reales.
      const datosOrdenados = filteredPosts.sort((a, b) => {
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
  }, [router, userData?.fullName]);



  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="w-full">
          <Hero data={userData} />
        </div>
        <div className="flex space-x-4">
          <div className="w-96">
            <Profile data={userData} />
          </div>
          <div className="flex-grow h-screen">
            <Posts data={posts} />
          </div>
        </div>
      </div>
    </>
  );
}
