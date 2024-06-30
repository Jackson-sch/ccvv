import React from "react";
import MapComponent from "../maps/MapComponent";

import { Accordion, AccordionItem, Chip, Image } from "@nextui-org/react";
import PageTitle from "../PageTitle";

export default function ContentDetails({ item }) {
  const center = {
    lat: parseFloat(item.latitud),
    lng: parseFloat(item.longitud),
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 mr-4">
          
            <Image
              src={item.imageUrl}
              width={500}
              height={500}
              alt="Imagen de la ocurrencia"
              className="mt-2"
            />
        </div>

        <div className="w-1/2">
          <div>
            <PageTitle title={item.ocurrencia} />
            <span className="text-xs text-default-500">{item.clasificacion}</span>
          </div>
          <section>
            <p className="text-2xl font-bold mt-4">Cámara {item.camara}</p>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-bold text-sm text-default-500">
                  {item.fecha}
                </span>
                <span className="font-bold ml-2 text-sm text-default-500">
                  {item.hora}
                </span>
              </div>
              <div>
                <Chip variant="shadow" color="primary" className="font-bold">
                  {item.turno}
                </Chip>
              </div>
            </div>
          </section>
          <div className="flex flex-col mb-4">
            <span className="text-sm">{item.direccion}</span>
            <div className="flex gap-4">
              <span className="text-xs text-default-500">{item.latitud}</span>
              <span className="text-xs text-default-500">{item.longitud}</span>
            </div>
          </div>
          <section>
            <p className="mb-4">{item.observaciones}</p>
          </section>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <Accordion variant="splitted">
                <AccordionItem title="Datos Operador">
                  <div className="flex flex-col">
                    <span className="text-md">{item.nombres_apellidos}</span>
                    <div className="flex gap-4">
                      <span className="text-xs text-default-500">
                        {item.operador}
                      </span>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
            <section>
              <MapComponent item={item} center={center} zoom={16} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
