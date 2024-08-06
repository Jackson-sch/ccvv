import React, { useEffect, useState } from "react";
import CardSkeleton from "@/components/CardSkeleton/CardSkeleton";
import { fetchIncidencias, fetchUsers } from "@/utils/fetchingData";
import PostItem from "./PostItem";
import Filtro from "./Filtro";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [userImages, setUserImages] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("");

  //contador de posts
  const [countTotal, setCountTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Obtén los datos de incidencias
      const incidenciasData = await fetchIncidencias();

      // Obtén los usuarios y crea un mapa de nombre a imagen
      const usersData = await fetchUsers();
      const userImagesMap = usersData.reduce((acc, user) => {
        acc[user.name] = user.imageUrl;
        return acc;
      }, {});

      setUserImages(userImagesMap);

      // Ordena los datos por fecha y hora
      const datosOrdenados = incidenciasData.sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
        return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
      });

      // Toma los últimos 5 elementos después de ordenar
      setPosts(datosOrdenados);
      setCountTotal(datosOrdenados.length);
      setFilteredPosts(datosOrdenados.slice(0, 5));
    };

    fetchData();
  }, [setCountTotal, setFilteredPosts, setPosts]);

  useEffect(() => {
    if (filter) {
      const filtered = posts.filter((post) => post.status === filter);
      setFilteredPosts(filtered);
      setCountTotal(filtered.length);
    } else {
      setCountTotal(posts.length);
      setFilteredPosts(posts.slice(0, 5));
    }
  }, [filter, posts]);

  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <>
        <Filtro setFilter={setFilter} />
        <CardSkeleton />
      </>
    );
  }

  return (
    <>
      <Filtro setFilter={setFilter} countTotal={countTotal} />
      {filteredPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          image={userImages[post.nombres_apellidos]}
        />
      ))}
    </>
  );
}
