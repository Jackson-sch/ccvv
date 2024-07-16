import React from "react";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { Button, Chip } from "@nextui-org/react";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <div>
      <PageTitle
        title="Estaciones de Trabajo"
        descripcion="Este modulo se muestra todas las pc's que están dentro de la sala de Monitoreo"
      />
      <div className="flex justify-end">
        <Button
          color="secondary"
          variant="flat"
          size="sm"
          endContent={<Plus size={16} strokeWidth={1} />}
        >
          Agregar
        </Button>
      </div>

      <section className="grid w-full grid-cols-1 -order-last gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3">
        {cardData.map((card, index) => (
          <CardContent
            key={index}
            className="hover:scale-105 mt-4 p-8 bg-gradient-to-tr from-transparent via-default-100 to-transparent hover:shadow-xl hover:bg-gradient-to-br transition-colors duration-500"
          >
            <div className="flex flex-col-1 justify-between items-center">
              <p className="font-bold capitalize text-lg">{card.name}</p>
              <Chip variant="flat">{card.status}</Chip>
            </div>
            <div className="flex flex-col-1 gap-4">
              <p className="text-sm">{card.hostname}</p>
              <p className="text-sm">{card.ip}</p>
            </div>
          </CardContent>
        ))}
      </section>
    </div>
  );
}

const cardData = [
  {
    name: "Omega 01",
    status: "active",
    hostname: "237.84.2.178",
    ip: "237.84.2.178",
  },
  {
    name: "Omega 02",
    status: "active",
    hostname: "237.84.2.179",
    ip: "237.84.2.179",
  },
  {
    name: "Omega 03",
    status: "active",
    hostname: "237.84.2.180",
    ip: "237.84.2.180",
  },
  {
    name: "Omega 04",
    status: "active",
    hostname: "237.84.2.181",
    ip: "237.84.2.181",
  },
  {
    name: "Omega 05",
    status: "active",
    hostname: "237.84.2.182",
    ip: "237.84.2.182",
  },
  {
    name: "Omega 06",
    status: "active",
    hostname: "237.84.2.183",
    ip: "237.84.2.183",
  },
  {
    name: "Omega 07",
    status: "active",
    hostname: "237.84.2.184",
    ip: "237.84.2.184",
  },
  {
    name: "Omega 08",
    status: "active",
    hostname: "237.84.2.185",
    ip: "237.84.2.185",
  },
  {
    name: "Omega 09",
    status: "active",
    hostname: "237.84.2.186",
    ip: "237.84.2.186",
  },
  {
    name: "Omega 10",
    status: "active",
    hostname: "237.84.2.187",
    ip: "237.84.2.187",
  },
  {
    name: "Omega 11",
    status: "active",
    hostname: "237.84.2.188",
    ip: "237.84.2.188",
  },
  {
    name: "Omega 12",
    status: "active",
    hostname: "237.84.2.189",
    ip: "237.84.2.189",
  },
];
