import React, { useEffect, useState } from "react";
import { CardContent } from "../Card";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { fetchIncidencias } from "@/utils/fetchingData";
import PostItem from "../PostRelevantes/PostItem";
import Filtro from "../PostRelevantes/Filtro";

export default function FriendPost({ user }) {
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [filter, setFilter] = useState("");
  const image = user.imageUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtén los datos de incidencias
        const incidenciasData = await fetchIncidencias();

        // Filtra las incidencias que corresponden al usuario actual (perfil visitado)
        const filteredPosts = incidenciasData.filter(
          (post) => post.nombres_apellidos === user.name
        );

        // Ordena los datos por fecha y hora
        const datosOrdenados = filteredPosts.sort((a, b) => {
          const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
          const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
          return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
        });

        // Toma los últimos 5 elementos después de ordenar
        /* const ultimosCincoRegistros = datosOrdenados.slice(0, 5); */
        setPosts(datosOrdenados);
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };

    fetchData();
  }, [user.name]);

  useEffect(() => {
    if (filter) {
      const filtered = posts.filter((post) => post.status === filter);
      setFilteredPost(filtered);
    } else {
      setFilteredPost(posts);
    }
  }, [filter, posts]);

  // Si no hay posts, muestra el componente CardSkeleton
  if (!filteredPost || filteredPost.length === 0) {
    return (
      <>
        <div className="mx-auto container mt-12 max-w-screen-lg">
          <Filtro setFilter={setFilter} />
        </div>
        <CardSkeleton />
      </>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mx-auto container mt-12 max-w-screen-lg">
        <Filtro setFilter={setFilter} />
      </div>
      {filteredPost.map((data) => (
        <CardContent
          key={data.id}
          className="mb-6 bg-[hsla(0,0%,100%,.1)] mx-auto container mt-4 max-w-screen-lg"
        >
          <PostItem post={data} image={image} />
        </CardContent>
      ))}
    </div>
  );
}
