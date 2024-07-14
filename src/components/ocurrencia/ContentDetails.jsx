import React from "react";
import MapComponent from "../maps/MapComponent";
import { Chip, Image } from "@nextui-org/react";
import PageTitle from "@/components/PageTitle";

export default function ContentDetails({ item }) {
  const center = {
    lat: parseFloat(item.latitud),
    lng: parseFloat(item.longitud),
  };

  return (
    <div className="flex">
      <div className="w-1/2 mr-4">
        <ImageSection imageUrl={item.imageUrl} detalles={item.detalles} />
      </div>
      <div className="w-1/2">
        <HeaderSection item={item} />
        <AddressSection item={item} />
        <OperatorSection item={item} />
        <ObservationsSection observaciones={item.observaciones} />
        <MapSection item={item} center={center} />
      </div>
    </div>
  );
}

const ImageSection = ({ imageUrl, detalles }) => (
  <div className="flex flex-col">
    <Image
      src={imageUrl}
      width={500}
      isZoomed
      alt="Imagen de la ocurrencia"
      className="mt-2 mb-4"
    />
    <span className="text-2xl font-semibold uppercase bg-gradient-to-t from-transparent to-default-100 shadow-md rounded p-8">
      {detalles}
    </span>
  </div>
);

const HeaderSection = ({ item }) => (
  <div>
    <div>
      <PageTitle title={item.ocurrencia} />
      <span className="text-xs text-default-500">{item.clasificacion}</span>
    </div>
    <div className="flex justify-between items-center mt-4">
      <p className="text-2xl font-bold">Cámara {item.camara}</p>
      <Chip
        size="lg"
        variant="flat"
        color={
          item.status === "Leve"
            ? "success"
            : item.status === "Alta"
            ? "danger"
            : "default"
        }
      >
        {item.status}
      </Chip>
    </div>
    <DateAndTimeSection item={item} />
  </div>
);

const DateAndTimeSection = ({ item }) => (
  <div className="flex items-center gap-4 mb-2">
    <div>
      <span className="font-bold text-sm text-default-500">{item.fecha}</span>
      <span className="font-bold ml-2 text-sm text-default-500">
        {item.hora}
      </span>
    </div>
    <div>
      <p className="font-bold text-sm text-default-500">{item.turno}</p>
    </div>
  </div>
);

const AddressSection = ({ item }) => (
  <div className="flex flex-col my-4">
    <div className="flex justify-between items-center">
      <span className="text-sm">{item.direccion}</span>
      <span className="text-sm text-default-500">{item.sector_mapa}</span>
    </div>
    <div className="flex gap-4">
      <span className="text-xs text-default-500">{item.latitud}</span>
      <span className="text-xs text-default-500">{item.longitud}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-sm text-default-500">{item.zona}</span>
      <span className="text-sm text-default-500">{item.comisaria}</span>
    </div>
  </div>
);

const OperatorSection = ({ item }) => (
  <div className="flex items-center justify-between mb-4">
    <p className="text-lg text-default-600">{item.nombres_apellidos}</p>
    <p className="font-bold text-sm text-default-500">{item.operador}</p>
  </div>
);

const ObservationsSection = ({ observaciones }) => (
  <div className="bg-gradient-to-t from-transparent to-default-100 shadow-md rounded px-2 pt-6 pb-8 mb-4">
    <p className="mb-4 text-sm text-pretty leading-relaxed">{observaciones}</p>
  </div>
);

const MapSection = ({ item, center }) => (
  <div className="mt-4">
    <MapComponent item={item} center={center} zoom={16} />
  </div>
);
