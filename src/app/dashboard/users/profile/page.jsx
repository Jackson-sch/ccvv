"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/users/profile/Hero";
import Profile from "@/components/users/profile/Profile";
import { Tab, Tabs } from "@nextui-org/react";
import Formulario from "@/components/users/Formulario";
import Posts from "@/components/users/profile/Posts";

export default function page() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/incidencia");
      const data = await response.json();
      // Ordena los datos por fecha y hora. Asegúrate de ajustar 'fecha' y 'hora' a tus campos reales.
      const datosOrdenados = data.sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
        return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
      });
      // Toma los últimos 5 elementos después de ordenar
      const ultimosCincoRegistros = datosOrdenados.slice(0, 5);
      setPosts(ultimosCincoRegistros);
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
        <div className="row-span-3">
          <Profile data={user} />
        </div>
        <div className="col-span-2 w-full">
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
