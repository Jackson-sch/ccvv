import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import {
  Avatar,
  Button,
  Divider,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import CardSkeleton from "@/components/CardSkeleton/CardSkeleton";
import { fetchIncidencias } from "@/utils/fetchingData";
import PostItem from "./PostItem";
import Hero from "@/components/profile/Hero";

export default function Posts({
  dataUser,
  setMonthlyCount = () => {},
  setCountTotal = () => {},
}) {
  const [posts, setPosts] = useState([]);

  const image = dataUser?.imageUrl;

  useEffect(() => {
    const fetchData = async () => {
      // Obtén los datos de incidencias
      const incidenciasData = await fetchIncidencias();

      // Filtra los posts que correspondan al usuario actual
      const filteredPosts = incidenciasData.filter(
        (post) => post.nombres_apellidos === dataUser?.fullName
      );

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const postsThisMonth = filteredPosts.filter((post) => {
        const postDate = new Date(post.fecha);
        return (
          postDate.getMonth() === currentMonth &&
          postDate.getFullYear() === currentYear
        );
      });

      setMonthlyCount(postsThisMonth.length);

      // Ordena los datos por fecha y hora. Asegúrate de ajustar 'fecha' y 'hora' a tus campos reales.
      const datosOrdenados = filteredPosts.sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
        return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
      });
      // Toma los últimos 5 elementos después de ordenar
      const ultimosCincoRegistros = datosOrdenados.slice(0, 5);
      setPosts(ultimosCincoRegistros);

      setCountTotal(filteredPosts.length); // Pasar countTotal al componente padre
    };
    fetchData();
  }, [dataUser?.fullName, setCountTotal, setMonthlyCount]);

  // si data es vacio, no hay posts carga este Skeleton
  if (!posts || posts.length === 0) {
    return <CardSkeleton />;
  }

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} image={image} />
      ))}
    </>
  );
}
