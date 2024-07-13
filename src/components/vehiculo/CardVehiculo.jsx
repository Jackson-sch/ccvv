import { Button, Chip, Image, ScrollShadow } from "@nextui-org/react";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";

function CardVehiculoItem({ item, url, handleDelete, statusColorMap }) {
  return (
    <div className="bg-gradient-to-t from-transparent to-default-50 shadow-md rounded-md hover:scale-105 transform transition-all duration-300 z-50">
      <div className="flex flex-col items-center justify-center m-auto p-4 gap-4">
        <div className="w-full flex items-center justify-center">
          <Image
            isBlurred
            src={item.imageUrl}
            alt={item.placa}
            className="object-cover object-center w-full h-64"
          />
        </div>
        <span className="font-semibold text-xl uppercase">{item.placa}</span>
        <div className="flex items-center justify-between gap-4 w-full">
          <p className="text-default-400 uppercase text-sm">{item.modelo}</p>
          <p className="text-default-400 uppercase text-sm">{item.color}</p>
          <Chip
            variant="flat"
            color={statusColorMap[item.prioridad]}
            className="uppercase text-sm"
          >
            {item.prioridad}
          </Chip>
        </div>
        <ScrollShadow hideScrollBar className="h-[80px] mb-10">
          <p className="uppercase text-pretty text-default-700 text-tiny">
            {item.detalles}
          </p>
        </ScrollShadow>
        <div className="flex justify-between mt-3 mb-3 gap-x-4 bottom-0 fixed">
          <Button variant="flat" onClick={() => handleDelete(item._id)}>
            Eliminar
            <Trash className="w-4 h-4 ml-2" />
          </Button>
          <Link href={`${url}${item._id}`}>
            <span className="text-primary cursor-pointer active:opacity-50">
              <Button variant="flat">
                Editar
                <EditIcon className="w-4 h-4 ml-2" />
              </Button>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CardVehiculo({ data, url, handleDelete, statusColorMap }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {data.map((item) => (
        <CardVehiculoItem
          key={item._id}
          item={item}
          url={url}
          handleDelete={handleDelete}
          statusColorMap={statusColorMap}
        />
      ))}
    </div>
  );
}
