import React from "react";
import { Chip, Image, ScrollShadow, User } from "@nextui-org/react";
import PageTitle from "@/components/PageTitle";

import { Container } from "../Card";
import MapaUbicacionDetails from "@/components/incidencia/maps/MapaDetalles/MapComponent";

export default function ContentDetails({ item }) {
  const center = {
    lat: parseFloat(item.latitud),
    lng: parseFloat(item.longitud),
  };

  return (
    <ScrollShadow hideScrollBar size={10} className="h-[80vh] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MapSection item={item} center={center} />
        <OperatorSection item={item} />
        <div className="col-span-1 lg:col-span-2">
          <ImageSection imageUrl={item.imageUrl} detalles={item.detalles} />
        </div>
      </div>
    </ScrollShadow>
  );
}

const ImageSection = ({ imageUrl }) => (
  <Container className="flex justify-center">
    <Image
      src={imageUrl}
      alt="Imagen de la ocurrencia"
      className="rounded-lg shadow-md"
    />
  </Container>
);

const OperatorSection = ({ item }) => (
  <Container className="bg-default-50 p-4 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <User
        name={item.nombres_apellidos}
        description={`${item.fecha} ${item.hora} ${item.turno}`}
      />
      <Chip
        size="sm"
        variant="flat"
        color={getColor(item.status)}
        className="capitalize"
      >
        {item.status}
      </Chip>
    </div>
    <div className="flex justify-between items-center pb-3">
      <p className="font-bold text-sm text-default-500">{item.operador}</p>
      <p className="font-bold text-sm text-default-500">{item.sector_mapa}</p>
    </div>
    <p className="text-default-500 text-sm leading-relaxed">
      {item.observaciones}
    </p>
    <div className="flex justify-end items-center pt-3">
      <p className="font-bold text-sm text-default-500">{item.comisaria}</p>
    </div>
  </Container>
);

const MapSection = ({ item, center }) => (
  <Container className="flex flex-col gap-4">
    <MapaUbicacionDetails
      item={item}
      center={center}
      zoom={16}
      className="rounded-lg shadow-lg"
    />
    <div className="p-4">
      <PageTitle className="text-xl font-bold" title={item.ocurrencia} />
      <p className="text-xs text-default-500">{item.clasificacion}</p>
      <div className="flex justify-between">
        <p className="text-sm text-default-500">{item.direccion}</p>
        <p className="text-sm text-default-500">Cámara {item.camara}</p>
      </div>
    </div>
  </Container>
);

const getColor = (status) => {
  switch (status) {
    case "Leve":
      return "success";
    case "Alta":
      return "danger";
    default:
      return "default";
  }
};
